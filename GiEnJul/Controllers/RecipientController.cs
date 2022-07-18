using AutoMapper;
using ClosedXML.Extensions;
using GiEnJul.Auth;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Helpers;
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
    public class RecipientController : ControllerBase
    {
        private readonly IRecipientRepository _recipientRepository;
        private readonly IPersonRepository _personRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IAutoIncrementRepository _autoIncrementRepository;
        private readonly ILogger _log;
        private readonly IMapper _mapper;
        private readonly IAuth0ManagementClient _managementClient;

        public RecipientController(
            IRecipientRepository recipientRepository,
            IPersonRepository personRepository,
            IEventRepository eventRepository,
            IAutoIncrementRepository autoIncrementRepository,
            ILogger log,
            IMapper mapper,
            IAuth0ManagementClient managementClient
            )
        {
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _eventRepository = eventRepository;
            _autoIncrementRepository = autoIncrementRepository;
            _log = log;
            _mapper = mapper;
            _managementClient = managementClient;
        }

        [HttpPost]
        [Authorize(Policy = Policy.AddRecipient)]
        public async Task<ActionResult<(string FamilyId,string ReferenceId)>> PostAsync([FromBody] PostRecipientDto recipientDto)
        {
            var currentEventName = await _eventRepository.GetActiveEventForLocationAsync(recipientDto.Location);
            var recipient = _mapper.Map<Recipient>(recipientDto);
            var currentEvent = $"{currentEventName}_{recipient.Location}";

            //post mapping as this data must be fetched
            recipient.FamilyId = await _autoIncrementRepository.GetNext(currentEvent, "Recipient");
            recipient.Event = currentEvent;
            recipient.EventName = currentEventName;

            if (recipient.ReferenceId != "")
            {
                var exist = await _recipientRepository.RecipientDoesExist(recipient.ReferenceId);
                if (exist) return BadRequest(recipient.ReferenceId);
            }

            //Add Recipient to Table Storage
            var insertedRecipient = await _recipientRepository.InsertOrReplaceAsync(recipient);
            
            try
            {
                //Add familymembers to Table Storage
                var family = _mapper.Map<List<Person>>(recipientDto.FamilyMembers);
                family.ForEach(person => person.RecipientId = insertedRecipient.RecipientId);

                await _personRepository.InsertOrReplaceBatchAsync(family);
                return (insertedRecipient.FamilyId, insertedRecipient.ReferenceId);
            }
            catch (Exception)
            {
                await _recipientRepository.DeleteAsync(insertedRecipient);
                throw;
            }
        }

        [HttpGet]
        [Authorize(Policy = Policy.ReadRecipient)]
        public async Task<List<Recipient>> GetRecipientsByInstitutionAsync([FromQuery] string institution)
        {
            var metadata = await _managementClient.GetUserMetadata(ClaimsHelper.GetUserId(User));
            var location = metadata["location"];
            var eventName = await _eventRepository.GetActiveEventForLocationAsync(location);

            var recipients = await _recipientRepository.GetRecipientsByInstitutionAndEventAsync(institution, eventName, location);
            var recipientIds = recipients.Select(r => r.RecipientId);
            var persons = await _personRepository.GetAllByRecipientIds(recipientIds);

            recipients.ForEach(r => r.FamilyMembers = persons.Where(p => p.RecipientId == r.RecipientId).ToList());

            return recipients;
        }

        [HttpGet("excel")]
        [Authorize(Policy = Policy.ReadRecipient)]
        public async Task<FileStreamResult> GetExcelListForInstitutionAsync()
        {
            var metadata = await _managementClient.GetUserMetadata(ClaimsHelper.GetUserId(User));
            var institution = metadata["institution"];
            var location = metadata["location"];

            var eventName = await _eventRepository.GetActiveEventForLocationAsync(location);

            var recipients = await _recipientRepository.GetRecipientsByInstitutionAndEventAsync(institution, eventName, location);
            if (!recipients.Any())
                throw new Exception("No recipients found");

            var recipientIds = recipients.Select(r => r.RecipientId);
            var persons = await _personRepository.GetAllByRecipientIds(recipientIds);

            recipients.ForEach(r => r.FamilyMembers = persons.Where(p => p.RecipientId == r.RecipientId).ToList());

            var excelRecipients = _mapper.Map<List<SubmittedFamiliesExcel>>(recipients);
            var excelPersons = _mapper.Map<List<SubmittedPersonExcel>>(persons.OrderBy(p => p.RecipientId));
            excelPersons.ForEach(p =>
            {
                var recipient = recipients.Single(r => r.RecipientId == p.RecipientId);
                p.ReferenceId = recipient.ReferenceId;
                p.FamilyId = recipient.FamilyId;
            });

            using var wb = ExcelGenerator.GenerateForRecipients(excelRecipients, excelPersons);
            return wb.Deliver($"Gi_en_jul_{institution}.xlsx");
        }
    }
}
