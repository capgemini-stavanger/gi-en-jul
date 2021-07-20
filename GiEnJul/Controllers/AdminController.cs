using AutoMapper;
using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;
using GiEnJul.Clients;
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
        private readonly IConnectionRepository _connectionRepository;
        private readonly ILogger _log;
        private readonly IMapper _mapper;
        private readonly IEmailClient _emailClient;

        public AdminController(IEventRepository eventRepository, IGiverRepository giverRepository, IRecipientRepository recipientRepository, IPersonRepository personRepository, IConnectionRepository connectionRepository, ILogger log, IMapper mapper, IEmailClient emailClient)
        {
            _eventRepository = eventRepository;
            _giverRepository = giverRepository;
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _connectionRepository = connectionRepository;
            _log = log;
            _mapper = mapper;
            _emailClient = emailClient;
        }
        //The function below is not in use now, but should be implemented later:
        // Need to add an appropriate routing for the api call below. 
        // [HttpGet]
        // public async Task<List<Models.Recipient>> GetUnmatchedRecipientsAsync(string location) {
        //     var currentEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
        // return await _recipientRepository.GetUnmatchedRecipientsAsync(location, currentEvent);
        // }

        [HttpGet("givers")]
        // [Authorize(Policy = "ReadGivers")] This will deny any unauthorized requests, but will break the application atm
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
        [HttpPost]
        public async Task<ActionResult> PostConnectionAsyc(string giverRowKey, string recipientRowKey, string partitonKey)
        {
            var recipient = await _recipientRepository.GetRecipientAsync(partitonKey, recipientRowKey);
            recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
            var giver = await _giverRepository.GetGiverAsync(partitonKey, giverRowKey);
            (string partitionKey, string rowKey) connection = await _connectionRepository.InsertOrReplaceAsync(giver, recipient);
            giver.IsSuggestedMatch = true;
            giver.MatchedRecipient = recipientRowKey;
            recipient.IsSuggestedMatch = true;
            recipient.MatchedGiver = giverRowKey;
            try
            {
                await _giverRepository.InsertOrReplaceAsync(giver);
                await _recipientRepository.InsertOrReplaceAsync(recipient);
            }
            catch (System.Exception e)
            {
                await _connectionRepository.DeleteConnectionAsync(connection.partitionKey, connection.rowKey);
                giver.IsSuggestedMatch = false;
                giver.MatchedRecipient = "";
                recipient.IsSuggestedMatch = false;
                recipient.MatchedGiver = "";
                await _giverRepository.InsertOrReplaceAsync(giver);
                await _recipientRepository.InsertOrReplaceAsync(recipient);
                throw e;
            }
            return Ok();
        }
    }
}
