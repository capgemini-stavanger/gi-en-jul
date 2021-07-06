using AutoMapper;
using GiEnJul.Features;
using GiEnJul.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        [HttpGet]
        public async Task<IEnumerable<Entities.Recipient>> GetUnmatchedRecipientsAsync(string location)
        {
            var currentEvent = await _eventRepository.GetActiveEventForLocationAsync(location);

            var query = new TableQuery<Entities.Recipient>() { FilterString = 
                TableQuery.CombineFilters(
                    TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, $"{currentEvent}_{location}"), 
                    TableOperators.And, 
                    TableQuery.GenerateFilterConditionForBool("IsMatched", QueryComparisons.Equal, false))
            };

            var recipients = await _recipientRepository.GetAllByQueryAsync(query);

            return recipients;
        }
        
        [HttpGet("allgivers")]
        public async Task<List<Models.Giver>> GetGiversAsync() {
            return _mapper.Map<List<Models.Giver>>(await _giverRepository.GetAllAsync()).OrderBy(x => x.FullName).ToList();
        }
    }
}
