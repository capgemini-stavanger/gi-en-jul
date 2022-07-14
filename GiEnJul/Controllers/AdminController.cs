using AutoMapper;
using ClosedXML.Extensions;
using GiEnJul.Auth;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Exceptions;
using GiEnJul.Helpers;
using GiEnJul.Infrastructure;
using GiEnJul.Models;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using GiEnJul.Utilities.EmailTemplates;
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
        private readonly IEmailTemplateBuilder _emailTemplateBuilder;
        private readonly IAuthorization _authorization;

        public AdminController(
            IEventRepository eventRepository,
            IGiverRepository giverRepository,
            IRecipientRepository recipientRepository,
            IPersonRepository personRepository,
            IConnectionRepository connectionRepository,
            ILogger log,
            IMapper mapper,
            IEmailClient emailClient,
            ISettings settings,
            IEmailTemplateBuilder emailTemplateBuilder,
            IAuthorization authorization)
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
            _emailTemplateBuilder = emailTemplateBuilder;
            _authorization = authorization;
        }

        [HttpGet("Overview/Givers")]
        [Authorize(Policy = Policy.ReadGiver)]
        public async Task<IEnumerable<Giver>> GetGiversByLocationAsync([FromQuery] string location)
        {            
            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var givers = await _giverRepository.GetGiversByLocationAsync(activeEvent, location);

            var recipients = await _recipientRepository.GetRecipientsByLocationAsync(activeEvent, location);

            foreach (var giver in givers.Where(x => x.IsSuggestedMatch))
            {
                var matchedRecipient = recipients.Find(x => x.RecipientId == giver.MatchedRecipient);
                giver.MatchedFamilyId = matchedRecipient.FamilyId;
            }

            return givers
                .OrderBy(x => x.HasConfirmedMatch)
                .ThenBy(x => x.IsSuggestedMatch)
                .ThenBy(x => x.RegistrationDate)
                .ToList();
        }

        [HttpGet("Overview/Recipients")]
        [Authorize(Policy = Policy.ReadRecipient)]
        public async Task<List<Recipient>> GetRecipientsByLocationAsync([FromQuery] string location)
        {
            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var recipients = await _recipientRepository.GetRecipientsByLocationAsync(activeEvent, location);

            var ids = recipients.Select(r => r.RecipientId).ToList();
            var persons = await _personRepository.GetAllByRecipientIds(ids);

            recipients
                .ForEach(r => r.FamilyMembers = 
                            persons.Where(p => p.RecipientId == r.RecipientId)
                .ToList());

            return recipients
                .OrderBy(x => x.HasConfirmedMatch)
                .ThenBy(x => x.IsSuggestedMatch)
                .ToList();
        }

        [HttpGet("excel/delivery/{location}")]
        [Authorize(Policy = Policy.DownloadDeliveryExcel)]
        public async Task<FileStreamResult> DownloadExcelDeliveryLocationAsync(string location)
        {
            var eventName = await _eventRepository.GetActiveEventForLocationAsync(location);
            var connections = await _connectionRepository.GetAllByLocationEventAsync(location, eventName);
            using var wb = ExcelGenerator.Generate(_mapper.Map<IEnumerable<DeliveryExcel>>(connections));
            return wb.Deliver("leveranse_liste.xlsx");
        }

        [HttpGet("connections/{location}")]
        [Authorize(Policy = Policy.ReadConnection)]
        public async Task<IList<GetConnectionDto>> GetConnectionsByLocationAsync(string location)
        {
            var eventName = await _eventRepository.GetActiveEventForLocationAsync(location);
            var completed = await _connectionRepository.GetAllConnectionsByLocation(eventName, location);
            var connecitonDtos = _mapper.Map<List<GetConnectionDto>>(completed);
            return connecitonDtos;
        }

        [HttpPost("event")]
        [Authorize(Policy = Policy.AddEvent)]
        public async Task<ActionResult> PostEventAsync([FromBody] PostEventDto eventDto)
        {
            if (eventDto.StartDate <= DateTime.Today || eventDto.StartDate >= eventDto.EndDate)
            {
                throw new ArgumentException();
            }

            var eventEntity = _mapper.Map<Event>(eventDto);
            await _eventRepository.InsertOrReplaceAsync(eventEntity);

            return Ok();
        }

        [HttpPut("person/{person_rowkey}/wish")]
        [Authorize(Policy = Policy.UpdateWish)]
        public async Task<ActionResult> PutWishAsync(string person_rowkey, [FromBody] string wish)  
        {
            var person = await _personRepository.GetPersonByRowKey(person_rowkey);
            person.Wish = wish.Any() ? wish : null;

            await _personRepository.InsertOrReplaceAsync(person);

            return Ok();
        }

        [HttpDelete("Connection")]
        [Authorize(Policy = Policy.DeleteConnection)]
        public async Task<ActionResult> DeleteConnectionAsync([FromBody] DeleteConnectionDto connectionDto)
        {
            var giver = await _giverRepository.GetGiverAsync(connectionDto.PartitionKey, connectionDto.RowKey);

            var recipient = await _recipientRepository.GetRecipientAsync(connectionDto.PartitionKey, connectionDto.RowKey);

            if (giver is null && recipient is null)
            {
                return NotFound();
            }

            if (giver?.MatchedRecipient != null && recipient is null)
            {
                recipient = await _recipientRepository.GetRecipientAsync(connectionDto.PartitionKey, giver.MatchedRecipient);
            }

            if (recipient?.MatchedGiver != null && giver is null)
            {
                giver = await _giverRepository.GetGiverAsync(connectionDto.PartitionKey, recipient.MatchedGiver);
            }

            if (recipient is null || giver is null)
            {
                return NotFound();
            }

            var originalGiver = giver.ShallowCopy();
            var originalRecipient = recipient.ShallowCopy();

            giver.HasConfirmedMatch = false;
            giver.IsSuggestedMatch = false;
            giver.MatchedRecipient = null;

            recipient.HasConfirmedMatch = false;
            recipient.IsSuggestedMatch = false;
            recipient.MatchedGiver = null;

            try
            {
                await _giverRepository.InsertOrReplaceAsync(giver);
                await _recipientRepository.InsertOrReplaceAsync(recipient);
            }
            catch (Exception e)
            {
                await _giverRepository.InsertOrReplaceAsync(originalGiver);
                await _recipientRepository.InsertOrReplaceAsync(originalRecipient);

                _log.Error(e, "Could not delete connection between {@0} and {@1}", giver, recipient);
                return NotFound();
            }

            if (!originalGiver.HasConfirmedMatch) return Ok();
            
            try
            {
                await _connectionRepository.DeleteConnectionAsync(connectionDto.PartitionKey, recipient.RecipientId + "_" + giver.EventName);
            }
            catch (Exception e)
            {
                await _giverRepository.InsertOrReplaceAsync(originalGiver);
                await _recipientRepository.InsertOrReplaceAsync(originalRecipient);

                _log.Error(e, "Could not delete connection between {@0} and {@1}", giver, recipient);
                return NotFound();
            }

            return Ok();
        }

        [HttpPost]
        [Authorize(Policy = Policy.AddConnection)]
        public async Task<ActionResult> SuggestConnectionAsync([FromBody] PostConnectionDto connectionDto)
        {
            var giver = await _giverRepository.GetGiverAsync(connectionDto.Event, connectionDto.GiverRowKey);
            var recipient = await _recipientRepository.GetRecipientAsync(connectionDto.Event, connectionDto.RecipientRowKey);

            if (!ConnectionHelper.CanSuggestConnection(giver, recipient))
            {
                throw new InvalidConnectionCreationException();
            }

            try
            {
                giver.IsSuggestedMatch = true;
                giver.MatchedRecipient = connectionDto.RecipientRowKey;
                giver.MatchedFamilyId = recipient.FamilyId;
                await _giverRepository.InsertOrReplaceAsync(giver);

                recipient.IsSuggestedMatch = true;
                recipient.MatchedGiver = connectionDto.GiverRowKey;
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RecipientId);

                var baseUrl = _settings.ReactAppUri.Split(';').Last();

                var verifyLink = $"{baseUrl}/{giver.GiverId}/{recipient.RecipientId}/{giver.Event}/verify";
                var denyLink = $"{baseUrl}/{giver.GiverId}/{recipient.RecipientId}/{giver.Event}/deny";

                var recipientNote = string.IsNullOrWhiteSpace(recipient.Note) ? "" : $"<strong>Merk:</strong> {recipient.Note}";

                var familyTable = "";
                for (var i = 0; i < recipient.PersonCount; i++)
                {
                    if (recipient.FamilyMembers != null)
                    {
                        var member = recipient.FamilyMembers[i];
                        familyTable += $"<li> {member.GetGenderAge()} </li>";
                        familyTable += " ";
                    }
                }

                var emailTemplatename = EmailTemplateName.VerifyConnection;
                var emailValuesDict = new Dictionary<string, string> 
                {
                    { "familyTable", familyTable },
                    { "verifyLink", verifyLink },
                    { "denyLink", denyLink },
                };
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(giver, "giver."));
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(recipient, "recipient."));

                var emailTemplate = await _emailTemplateBuilder.GetEmailTemplate(emailTemplatename, emailValuesDict);

                await _emailClient.SendEmailAsync(giver.Email, giver.FullName, emailTemplate.Subject, emailTemplate.Content);
            }
            catch (Exception e)
            {
                giver.IsSuggestedMatch = false;
                giver.MatchedRecipient = "";
                giver.MatchedFamilyId = "";
                await _giverRepository.InsertOrReplaceAsync(giver);

                recipient.IsSuggestedMatch = false;
                recipient.MatchedGiver = "";
                await _recipientRepository.InsertOrReplaceAsync(recipient);
                _log.Error(e, "Could not suggest connection between {@0} and {@1}", giver, recipient);

                throw;
            }
            return Ok();
        }

        [HttpDelete("Recipient")]
        [Authorize(Policy = Policy.DeleteRecipient)]
        public async Task<ActionResult> DeleteRecipientAsync([FromBody] DeleteRecipientDto recipientDto)
        {
            var recipientToDelete = await _recipientRepository.GetRecipientAsync(recipientDto.PartitionKey, recipientDto.RowKey);

            if (recipientToDelete.IsSuggestedMatch)
            {
                await DeleteConnectionAsync(new DeleteConnectionDto(recipientDto.PartitionKey, recipientDto.RowKey));
            }

            var personsToDelete = await _personRepository.GetAllByRecipientId(recipientDto.RowKey);

            if (recipientToDelete.PersonCount == 0 || personsToDelete.Count() == 0)
            {
                return NotFound();
            }

            await _recipientRepository.DeleteAsync(recipientToDelete);

            var deleteCount = 0;
            try
            {
                foreach (var person in personsToDelete)
                {
                    await _personRepository.DeleteAsync(person);
                    deleteCount += 1;
                }
            }
            catch (Exception e)
            {
                _log.Error(e, "unable to delete entity {@0}", recipientDto);
                await _personRepository.InsertOrReplaceBatchAsync(personsToDelete.GetRange(0, deleteCount));
                await _recipientRepository.InsertOrReplaceAsync(recipientToDelete);

                throw;
            }

            return Ok();
        }

        [HttpPut("Recipient")]
        [Authorize(Policy = Policy.UpdateRecipient)]
        public async Task<ActionResult> PutRecipientAsync([FromBody] PutRecipientDto recipientDto)
        {
            var recipientNew = _mapper.Map<Recipient>(recipientDto);
            var recipientOld = await _recipientRepository.GetRecipientAsync(recipientDto.Event, recipientDto.RecipientId);

            if (recipientOld.IsSuggestedMatch)
            {
                return BadRequest("Familie har allerede en foreslått tilkobling");
            }
            if (recipientOld.HasConfirmedMatch)
            {
                return BadRequest("Familie har allerede en tilkobling");
            }

            foreach (var prop in recipientOld.GetType().GetProperties())
            {
                var valueNew = prop.GetValue(recipientNew);
                var valueOld = prop.GetValue(recipientOld);
                if (valueNew == null) prop.SetValue(recipientNew, valueOld);
            }

            var childrenFromDb = await _personRepository.GetAllByRecipientId(recipientDto.RecipientId);
            var deleteChildren = childrenFromDb.Where(oldP => recipientNew.FamilyMembers.All(newP => oldP.PersonId != newP.PersonId)).ToList();

            try
            {
                await _recipientRepository.InsertOrReplaceAsync(recipientNew);
                await _personRepository.InsertOrReplaceBatchAsync(recipientNew.FamilyMembers);
                if (deleteChildren.Count() > 0) {
                    await _personRepository.DeleteBatchAsync(deleteChildren);
                }
            }
            catch (Exception ex)
            {
                _log.Error(ex, "unable to update entity {@0}", recipientDto);
                throw;
            }

            return Ok();
        }

        [HttpDelete("Giver")]
        [Authorize(Policy = Policy.DeleteGiver)]
        public async Task<ActionResult> DeleteGiverAsync([FromBody] DeleteGiverDto giverDto)
        {
            var giver = await _giverRepository.GetGiverAsync(giverDto.PartitionKey, giverDto.RowKey);

            if (giver.IsSuggestedMatch)
            {
                await DeleteConnectionAsync(new DeleteConnectionDto(giverDto.PartitionKey, giverDto.RowKey));
            }

            var giverToDelete = await _giverRepository.GetGiverAsync(giverDto.PartitionKey, giverDto.RowKey);
            await _giverRepository.DeleteAsync(giverToDelete);
            return Ok();
        }

        [HttpGet("Suggestions/Giver/{quantity}")]
        [HttpGet("Suggestions/Giver")]
        [Authorize(Policy = Policy.GetUnsuggestedGivers)]
        public async Task<IList<GiverDataTableDto>> GetUnsuggestedGiversAsync([FromQuery] string location, int quantity = 1)
        {
            if (quantity < 1) throw new ArgumentOutOfRangeException();

            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var unmatchedGivers = await _giverRepository.GetUnsuggestedAsync(activeEvent, location, quantity);

            var suggestions = unmatchedGivers
                .OrderBy(x => x.RegistrationDate)
                .GroupBy(x => x.MaxReceivers)
                .Select(x => x.First())
                .OrderBy(x => x.MaxReceivers)
                .ToList();

            return _mapper.Map<IList<GiverDataTableDto>>(suggestions);
        }

        [HttpGet("Suggestions/Recipient/{quantity}")]
        [HttpGet("Suggestions/Recipient")]
        [Authorize(Policy = Policy.GetUnsuggestedRecipients)]
        public async Task<IList<RecipientDataTableDto>> GetUnsuggestedRecipientsAsync([FromQuery] string location, int quantity = 1)
        {
            if (quantity < 1) throw new ArgumentOutOfRangeException();

            var activeEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
            var unmatchedRecipients = await _recipientRepository.GetUnsuggestedAsync(activeEvent, location, quantity);

            var suggestions = SuggestionHelper.GetRandomSuggestions(unmatchedRecipients, quantity);

            var ids = suggestions.Select(r => r.RecipientId).ToList();
            var persons = await _personRepository.GetAllByRecipientIds(ids);

            suggestions.ForEach(r => r.FamilyMembers = persons.Where(p => p.RecipientId == r.RecipientId).ToList());
            return _mapper.Map<IList<RecipientDataTableDto>>(suggestions);
        }
    }
}
