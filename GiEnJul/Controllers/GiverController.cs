using AutoMapper;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Features;
using GiEnJul.Models;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiverController : ControllerBase
    {
        private readonly IGiverRepository _giverRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IEmailClient _emailClient;
        private readonly ILogger _log;
        private readonly IMapper _mapper;

        public GiverController(IGiverRepository giverRepository, IEventRepository eventRepository, IEmailClient emailClient, ILogger log, IMapper mapper)
        {
            _giverRepository = giverRepository;
            _eventRepository = eventRepository;
            _emailClient = emailClient;
            _log = log;
            _mapper = mapper;
        }

        // POST api/<GiverController>
        [HttpPost]
        public async Task<ActionResult<PostGiverResultDto>> PostAsync([FromBody] PostGiverDto giverDto)
        {
            var giver = _mapper.Map<Giver>(giverDto);
            giver.EventName = await _eventRepository.GetActiveEventForLocationAsync(giverDto.Location);

            var insertedAsDto = _mapper.Map<PostGiverResultDto>(await _giverRepository.InsertOrReplaceAsync(giver));

            var messageContent = string.Format($"{insertedAsDto.FullName}, vi bekrefter å ha mottatt din registering for å gi en jul i {insertedAsDto.Location}");
            await _emailClient.SendEmailAsync(insertedAsDto.Email, insertedAsDto.FullName, "Takk for din registrering!", messageContent);

            return CreatedAtAction(nameof(insertedAsDto), insertedAsDto);
        }
    }
}