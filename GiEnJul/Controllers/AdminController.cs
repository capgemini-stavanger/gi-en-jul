using AutoMapper;
using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;
using GiEnJul.Models;
using Microsoft.AspNetCore.Authorization;

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
        //The function below is not in use now, but should be implemented later:
        // Need to add an appropriate routing for the api call below. 
        // [HttpGet]
        // public async Task<List<Models.Recipient>> GetUnmatchedRecipientsAsync(string location) {
        //     var currentEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
        // return await _recipientRepository.GetUnmatchedRecipientsAsync(location, currentEvent);
        // }

        [HttpGet("givers")]
        // [Authorize] This will deny any unauthorized requests, but will break the application atm
        [Authorize(Policy = "ReadGivers")]
        public async Task<IEnumerable<Giver>> GetGiversAsync()
        {
            return await _giverRepository.GetAllAsModelAsync();
            // return _mapper.Map<List<Models.Giver>>(await _giverRepository.GetAllAsync()).OrderBy(x => x.FullName).ToList();
        }
        [HttpGet("recipients")]
        public async Task<List<Recipient>> GetRecipientsAsync()
        {
            var recipients = await _recipientRepository.GetAllAsModelAsync();
            foreach (var recipient in recipients)
            {
                var familyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
                recipient.FamilyMembers = familyMembers;
            }
            return recipients;
        }
    }
}
