using AutoMapper;
using GiEnJul.Dtos;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;
using GiEnJul.Clients;
using GiEnJul.Models;
using Microsoft.AspNetCore.Authorization;
using GiEnJul.Repositories;
using System;
using GiEnJul.Exceptions;
using GiEnJul.Helpers;
using GiEnJul.Infrastructure;

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
        private readonly ISettings _settings;

        public AdminController(
            IEventRepository eventRepository,
            IGiverRepository giverRepository,
            IRecipientRepository recipientRepository,
            IPersonRepository personRepository,
            IConnectionRepository connectionRepository,
            ILogger log,
            IMapper mapper,
            IEmailClient emailClient,
            ISettings settings)
        {
            _eventRepository = eventRepository;
            _giverRepository = giverRepository;
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _connectionRepository = connectionRepository;
            _log = log;
            _mapper = mapper;
            _emailClient = emailClient;
            _settings = settings;
        }
        //The function below is not in use now, but should be implemented later:
        // Need to add an appropriate routing for the api call below. 
        // [HttpGet]
        // public async Task<List<Models.Recipient>> GetUnmatchedRecipientsAsync(string location) {
        //     var currentEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
        // return await _recipientRepository.GetUnmatchedRecipientsAsync(location, currentEvent);
        // }

        [HttpGet("givers")]
        //[Authorize(Policy = "ReadGiver")] 
        public async Task<IEnumerable<Giver>> GetGiversAsync()
        {
            return await _giverRepository.GetAllAsModelAsync();
            // return await _giverRepository.GetAllAsync().OrderBy(x => x.FullName).ToList();
        }
        [HttpGet("recipients")]
        //[Authorize(Policy = "ReadRecipient")]
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
        public async Task<ActionResult> SuggestConnectionAsyc([FromBody] PostConnectionDto connectionDto)
        {
            var giver = await _giverRepository.GetGiverAsync(connectionDto.GiverPartitionKey, connectionDto.GiverRowKey);
            (var recipient, int familyCount) = await _recipientRepository.GetRecipientWithFamilyCountAsync(connectionDto.RecipientPartitionKey, connectionDto.RecipientRowKey);

            if (!ConnectionHelper.CanSuggestConnection(giver, recipient))
            {
                throw new InvalidConnectionCreationException();
            }

            try
            {
                giver.IsSuggestedMatch = true;
                giver.MatchedRecipient = connectionDto.RecipientRowKey;
                await _giverRepository.InsertOrReplaceAsync(giver);

                recipient.IsSuggestedMatch = true;
                recipient.MatchedGiver = connectionDto.GiverRowKey;
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                var title = "Du har blitt tildelt en familie!";
                var verifyLink = $"{_settings.ReactAppUri}/{giver.RowKey}/{recipient.RowKey}/{giver.PartitionKey}";
                var body =
                    $"Hei {giver.FullName}! " +
                    $"Du har nå fått tildelt en familie på {familyCount}, og vi ønsker tilbakemelding fra deg om du fortsatt har mulighet til å gi en jul. " +
                    $"<a href=\"{verifyLink}\">Vennligst trykk her for å bekrefte tildelingen</a> ";

                await _emailClient.SendEmailAsync(giver.Email, giver.FullName, title, body);
            }
            catch (Exception e)
            {
                giver.IsSuggestedMatch = false;
                giver.MatchedRecipient = "";
                await _giverRepository.InsertOrReplaceAsync(giver);

                recipient.IsSuggestedMatch = false;
                recipient.MatchedGiver = "";
                await _recipientRepository.InsertOrReplaceAsync(recipient);
                throw e;
            }
            return Ok();
        }

        [HttpDelete("recipient")]
        [Authorize(Policy = "DeleteRecipient")]
        public async Task<ActionResult> DeleteRecipientAsync([FromBody] DeleteRecipientDto recipientDto)
        {
            var recipientToDelete = await _recipientRepository.GetRecipientAsync(recipientDto.PartitionKey, recipientDto.RowKey);
            var deletedRecipient = await _recipientRepository.DeleteAsync(recipientToDelete);
            return Ok();
        }

        [HttpDelete("giver")]
        [Authorize(Policy = "DeleteGiver")]
        public async Task<ActionResult> DeleteGiverAsync([FromBody] DeleteGiverDto giverDto)
        {
            var giverToDelete = await _giverRepository.GetGiverAsync(giverDto.PartitionKey, giverDto.RowKey);
            var deletedGiver = await _giverRepository.DeleteAsync(giverToDelete);
            return Ok();
        }

        [HttpGet("Suggestions/Giver/{quantity}")]
        [HttpGet("Suggestions/Giver")]
        public async Task<IList<GiverDataTableDto>> GetSuggestedGiversAsync([FromBody] string location, int quantity = 1)
        {
            if (quantity < 1) throw new ArgumentOutOfRangeException();

            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var givers = await _giverRepository.GetSuggestionsAsync(activeEvent, location);

            var suggestions = SuggestionHelper.GetSuggestions(givers, quantity);

            return _mapper.Map<IList<GiverDataTableDto>>(suggestions);
        }
    }
}
