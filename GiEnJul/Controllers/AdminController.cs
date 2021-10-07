using AutoMapper;
using ClosedXML.Extensions;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Exceptions;
using GiEnJul.Helpers;
using GiEnJul.Infrastructure;
using GiEnJul.Models;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using GiEnJul.Utilities.ExcelClasses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("Overview/Givers")]
        [Authorize(Policy = "ReadGiver")]
        public async Task<IEnumerable<Giver>> GetGiversByLocationAsync([FromQuery] string location)
        {
            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var givers = await _giverRepository.GetGiversByLocationAsync(activeEvent, location);
            return givers.OrderBy(x => x.RegistrationDate).ToList();
            
        }

        [HttpGet("Overview/Recipients")]
        [Authorize(Policy = "ReadRecipient")]
        public async Task<List<Recipient>> GetRecipientsByLocationAsync([FromQuery] string location)
        {
            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var recipients = await _recipientRepository.GetRecipientsByLocationAsync(activeEvent, location);
            foreach (var recipient in recipients)
            {
                recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
            }
            return recipients;
        }

        [HttpGet("excel/delivery/{location}")]
        [Authorize(Policy = "DownloadDeliveryExcel")]
        public async Task<FileStreamResult> DownloadExcelDeliveryLocationAsync(string location)
        {
            var eventName = await _eventRepository.GetActiveEventForLocationAsync(location);
            var connections = await _connectionRepository.GetAllByLocationEventAsync(location, eventName);
            using var wb = ExcelGenerator.Generate(_mapper.Map<IEnumerable<DeliveryExcel>>(connections));
            return wb.Deliver("leveranse_liste.xlsx");
        }

        [HttpGet("connections/{location}")]
        [Authorize(Policy = "ReadConnection")]
        public async Task<IList<GetConnectionDto>> GetConnectionsByLocationAsync(string location)
        {
            var eventName = await _eventRepository.GetActiveEventForLocationAsync(location);
            var completed = await _connectionRepository.GetAllConnectionsByLocation(eventName, location);
            var connecitonDtos = _mapper.Map<List<GetConnectionDto>>(completed);
            var suggestedGiver = await _giverRepository.GetSuggestedAsync(eventName, location);
            var suggestedRecipient = await _recipientRepository.GetSuggestedAsync(eventName, location);
            foreach (var giver in suggestedGiver)
            {
                var mathedGiver = suggestedRecipient.FirstOrDefault(x => x.MatchedGiver == giver.RowKey);
                suggestedRecipient.Remove(mathedGiver);
                connecitonDtos.Add(_mapper.Map<GetConnectionDto>((giver, mathedGiver)));
            }
            return connecitonDtos;
        }

        [HttpPost("event")]
        [Authorize(Policy = "AddEvent")]
        public async Task<ActionResult> PostEventAsync([FromBody] PostEventDto eventDto)
        {
            if (eventDto.StartDate <= System.DateTime.Today || eventDto.StartDate >= eventDto.EndDate)
            {
                throw new ArgumentException();
            }

            var eventEntity = _mapper.Map<Event>(eventDto);
            await _eventRepository.InsertOrReplaceAsync(eventEntity);

            return Ok();
        }

        [HttpPut("person/{person_rowkey}/wish")]
        [Authorize(Policy = "UpdateWish")]
        public async Task<ActionResult> PutWishAsync(string person_rowkey, [FromBody] string wish)  
        {
            var person = await _personRepository.GetPersonByRowKey(person_rowkey);
            person.Wish = wish.Any() ? wish : null;

            await _personRepository.InsertOrReplaceAsync(person);

            return Ok();
        }


        [HttpPost]
        [Authorize(Policy = "AddConnection")]
        public async Task<ActionResult> SuggestConnectionAsync([FromBody] PostConnectionDto connectionDto)
        {
            var giver = await _giverRepository.GetGiverAsync(connectionDto.GiverPartitionKey, connectionDto.GiverRowKey);
            var recipient = await _recipientRepository.GetRecipientAsync(connectionDto.RecipientPartitionKey, connectionDto.RecipientRowKey);

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

                recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);

                var title = "Du har blitt tildelt en familie!";
                var verifyLink = $"{_settings.ReactAppUri}/{giver.RowKey}/{recipient.RowKey}/{giver.PartitionKey}";
                var body =
                    $"Hei {giver.FullName}! " +
                    $"Du har nå fått tildelt en familie på {GetFamilyMembersString(recipient.FamilyMembers)}, og vi ønsker tilbakemelding fra deg om du fortsatt har mulighet til å gi en jul. " +
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

        private string GetFamilyMembersString(List<Person> familyMembers)
        {
            var children = familyMembers.Count(x => x.Age < 18);
            var adults = familyMembers.Count(x => x.Age >= 18);
            var str = "";
            if(children >= 0) 
                str += children + " barn og ";
            
            if(adults == 1) 
                str += $"{adults} voksen";
            else 
                str += $"{adults} voksne";

            return str;
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
        [Authorize(Policy = "GetUnsuggestedGivers")]
        public async Task<IList<GiverDataTableDto>> GetUnsuggestedGiversAsync([FromQuery] string location, int quantity = 1)
        {
            if (quantity < 1) throw new ArgumentOutOfRangeException();

            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var unmatchedGivers = await _giverRepository.GetUnsuggestedAsync(activeEvent, location, quantity);

            var suggestions = unmatchedGivers
                .OrderBy(x => x.RegistrationDate)
                .GroupBy(x => x.MaxReceivers)
                .Select(x => x.First())
                .ToList();

            return _mapper.Map<IList<GiverDataTableDto>>(suggestions);
        }

        [HttpGet("Suggestions/Recipient/{quantity}")]
        [HttpGet("Suggestions/Recipient")]
        [Authorize(Policy = "GetUnsuggestedRecipients")]
        public async Task<IList<RecipientDataTableDto>> GetUnsuggestedRecipientsAsync([FromQuery] string location, int quantity = 1)
        {
            if (quantity < 1) throw new ArgumentOutOfRangeException();

            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var unmatchedRecipients = await _recipientRepository.GetUnsuggestedAsync(activeEvent, location, quantity);

            var suggestions = SuggestionHelper.GetRandomSuggestions(unmatchedRecipients, quantity);

            foreach (var recipient in suggestions)
            {
                recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
            }
            return _mapper.Map<IList<RecipientDataTableDto>>(suggestions);
        }
    }
}
