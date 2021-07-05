using AutoMapper;
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
        private readonly ILogger _log;
        private readonly IMapper _mapper;

        public GiverController(IGiverRepository giverRepository, IEventRepository eventRepository, ILogger log, IMapper mapper)
        {
            _giverRepository = giverRepository;
            _eventRepository = eventRepository;
            _log = log;
            _mapper = mapper;
        }

        // POST api/<GiverController>
        [HttpPost]
        public async Task<ActionResult<Entities.Giver>> PostAsync([FromBody] PostGiverDto giverDto)
        {
            var giver = _mapper.Map<Giver>(giverDto);
            giver.EventName = await _eventRepository.GetActiveEventForLocationAsync(giverDto.Location);

            var result = await _giverRepository.InsertOrReplaceAsync(giver);
            return CreatedAtAction(nameof(result), result);
        }
    }
}