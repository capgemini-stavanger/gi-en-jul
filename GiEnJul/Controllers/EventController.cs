using AutoMapper;
using GiEnJul.Auth;
using GiEnJul.Dtos;
using GiEnJul.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly ILogger _log;
        private readonly IMapper _mapper;

        public EventController(IEventRepository eventRepository, ILogger log, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _log = log;
            _mapper = mapper;
        }

        // GET api/Event/ActiveLocations
        [HttpGet("ActiveLocations")]
        public async Task<string[]> GetActiveLocationsAsync()
        {
            return await _eventRepository.GetLocationsWithActiveEventAsync();
        }

        [HttpGet("contacts")]
        public async Task<List<GetContactsDto>> GetActiveContactsAsync()
        {
            var contacts = await _eventRepository.GetContactsWithActiveEventAsync();
            return _mapper.Map<List<GetContactsDto>>(contacts);

        }

        //POST api/Event/createEvent 
        [HttpPost("create")]
        [Authorize(Policy= Policy.SuperAdmin)]
        public async Task<ActionResult> PostEvent([FromBody] PostEventDto content)
        {
            var entity = await _eventRepository.InsertOrReplaceAsync(_mapper.Map<Models.Event>(content));
            if (entity == null)
            {
                return BadRequest();
            }
            return Ok();
        } 
    }
}
