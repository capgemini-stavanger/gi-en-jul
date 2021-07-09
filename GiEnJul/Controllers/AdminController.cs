using AutoMapper;
using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;
using GiEnJul.Models;
namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly IGiverRepository _giverRepository;
        private readonly IRecipientRepository _recipientRepository;
        private readonly IPersonRepository _personRepository;
        private readonly ILogger _log;
        private readonly IMapper _mapper;

        public AdminController(IEventRepository eventRepository, IGiverRepository giverRepository, IRecipientRepository recipientRepository, IPersonRepository personRepository, ILogger log, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _giverRepository = giverRepository;
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _log = log;
            _mapper = mapper;
        }

        [HttpGet("querygivers")]
        public async Task<List<Models.Recipient>> GetUnmatchedRecipientsAsync(string location) {
            var currentEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
        return await _recipientRepository.GetUnmatchedRecipientsAsync(location, currentEvent);
        }
        
        [HttpGet("allgivers")]
        public async Task<List<Models.Giver>> GetGiversAsync() {
            return _mapper.Map<List<Models.Giver>>(await _giverRepository.GetAllAsync());
            // return _mapper.Map<List<Models.Giver>>(await _giverRepository.GetAllAsync()).OrderBy(x => x.FullName).ToList();
        }
    }
}
