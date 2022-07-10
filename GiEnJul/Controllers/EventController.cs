using AutoMapper;
using GiEnJul.Dtos;
using GiEnJul.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;
using GiEnJul.Auth;

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

        // GET api/Event/GetAll
        [HttpGet("GetAll")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<List<Models.Event>> GetAllEvents()
        {
            return await _eventRepository.GetAllEventsAsync();
        }

        [HttpGet("contacts")]
        public async Task<List<GetContactsDto>> GetActiveContactsAsync()
        {
            var contacts = await _eventRepository.GetContactsWithActiveEventAsync();
            return _mapper.Map<List<GetContactsDto>>(contacts);

        }
    }
}
