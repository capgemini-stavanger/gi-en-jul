using GiEnJul.Dtos;
using GiEnJul.Models;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Threading.Tasks;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using GiEnJul.Repositories;

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

        public RecipientController(
            IRecipientRepository recipientRepository,
            IPersonRepository personRepository,
            IEventRepository eventRepository,
            IAutoIncrementRepository autoIncrementRepository,
            ILogger log,
            IMapper mapper
            )
        {
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _eventRepository = eventRepository;
            _autoIncrementRepository = autoIncrementRepository;
            _log = log;
            _mapper = mapper;
        }

        [HttpPost]
        [Authorize(Policy = "AddRecipient")]
        public async Task<ActionResult<(string FamilyId,string ReferenceId)>> PostAsync([FromBody] PostRecipientDto recipientDto)
        {
            var recipient = _mapper.Map<Recipient>(recipientDto);
            recipient.EventName = await _eventRepository.GetActiveEventForLocationAsync(recipient.Location);
            recipient.FamilyId = await _autoIncrementRepository.GetNext($"{recipient.EventName}_{recipient.Location}", "Recipient");

            //Add Recipient to Table Storage
            var insertedRecipient = await _recipientRepository.InsertOrReplaceAsync(recipient);

            try
            {
                //Add familymembers to Table Storage
                var family = _mapper.Map<List<Person>>(recipientDto.FamilyMembers);
                family.ForEach(person => person.PartitionKey = insertedRecipient.RowKey);

                await _personRepository.InsertOrReplaceBatchAsync(family);
                return (insertedRecipient.FamilyId, insertedRecipient.ReferenceId);
            }
            catch (Exception ex)
            {
                await _recipientRepository.DeleteAsync(insertedRecipient);
                throw ex;
            }
        }

        [HttpGet]
        [Authorize(Policy = "ReadRecipient")]
        public async Task<List<Recipient>> GetRecipientsByInstitutionAsync([FromQuery] string institution)
        {
            
            var recipients = await _recipientRepository.GetRecipientsByInstitutionAsync(institution);
            foreach (var recipient in recipients)
            {
                recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
            }
            return recipients;
        }
    }
}
