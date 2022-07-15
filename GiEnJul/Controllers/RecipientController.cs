﻿using GiEnJul.Dtos;
using GiEnJul.Models;
using GiEnJul.Auth;
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
        
            var recipients = await _recipientRepository.GetRecipientsByInstitutionAsync(institution);
            foreach (var recipient in recipients)
            {
                recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RecipientId);
            }
            return recipients;
        }
    }
}
