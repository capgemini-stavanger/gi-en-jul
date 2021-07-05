using AutoMapper;
using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Serilog;
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

        // GET api/Events/ActiveLocations
        [HttpGet("ActiveLocations")]
        public async Task<string[]> GetActiveLocationsAsync()
        {
            return await _eventRepository.GetLocationsWithActiveEventAsync();
        }
    }
}
