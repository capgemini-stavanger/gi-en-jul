﻿using AutoMapper;
using GiEnJul.Clients;
using GiEnJul.Exceptions;
using GiEnJul.Helpers;
using GiEnJul.Infrastructure;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Threading.Tasks;
using GiEnJul.Utilities.EmailTemplates;
using System.Collections.Generic;
using GiEnJul.Dtos;
using System.Linq;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly IGiverRepository _giverRepository;
        private readonly IRecipientRepository _recipientRepository;
        private readonly IPersonRepository _personRepository;
        private readonly IConnectionRepository _connectionRepository;
        private readonly ILogger _log;
        private readonly IMapper _mapper;
        private readonly ISettings _settings;
        private readonly IEmailClient _emailClient;
        private readonly IEmailTemplateBuilder _emailTemplateBuilder;

        public ConnectionController(
            IEventRepository eventRepository,
            IGiverRepository giverRepository,
            IRecipientRepository recipientRepository,
            IPersonRepository personRepository,
            IConnectionRepository connectionRepository,
            ILogger log,
            IMapper mapper,
            ISettings settings,
            IEmailClient emailClient,
            IEmailTemplateBuilder emailTemplateBuilder)
        {
            _eventRepository= eventRepository;
            _giverRepository = giverRepository;
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _connectionRepository = connectionRepository;
            _log = log;
            _mapper = mapper;
            _settings = settings;
            _emailClient = emailClient;
            _emailTemplateBuilder = emailTemplateBuilder;
        }

        // POST: /verify/giverGuid/recipientGuid/event_location
        [HttpPost("{giverRowKey}/{recipientRowKey}/{partitionkey}/verify")]
        public async Task VerifyConnection(string giverRowKey, string recipientRowKey, string partitionkey)
        {
            //Populate recipient and giver using keys
            var recipient = await _recipientRepository.GetRecipientAsync(partitionkey, recipientRowKey);
            recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
            var giver = await _giverRepository.GetGiverAsync(partitionkey, giverRowKey);

            if (_connectionRepository.ConnectionExists(giver, recipient))
            {
                return; 
            }

            if (!ConnectionHelper.CanConnect(giver, recipient))
            {
                throw new InvalidConnectionCreationException();
            }

            (string partitionKey, string rowKey) connection = await _connectionRepository.InsertOrReplaceAsync(giver, recipient);

            try
            {
                giver.HasConfirmedMatch = true;
                await _giverRepository.InsertOrReplaceAsync(giver);

                recipient.HasConfirmedMatch = true;
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                var @event = await _eventRepository.GetEventByUserLocationAsync(giver.Location);
                var recipientNote = string.IsNullOrWhiteSpace(recipient.Note) ? "" : $"<strong>Merk:</strong> {recipient.Note}";
                var familyTable = "";
                for (var i = 0; i < recipient.PersonCount; i++)
                {
                    if (recipient.FamilyMembers != null)
                    {
                        var member = recipient.FamilyMembers[i];
                        familyTable += $"<li>{member.ToReadableString()} </li>";
                        familyTable += " ";
                    }
                }

                var emailTemplatename = EmailTemplateName.AssignedFamily;
                var emailValuesDict = new Dictionary<string, string>
                {
                    { "familyTable", familyTable },
                    { "recipientNote", recipientNote },
                };
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(giver, "giver."));
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(@event, "eventDto."));
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(recipient, "recipient."));

                var emailTemplate = await _emailTemplateBuilder.GetEmailTemplate(emailTemplatename, emailValuesDict);

                await _emailClient.SendEmailAsync(giver.Email, giver.FullName, emailTemplate.Subject, emailTemplate.Content);
            }
            catch (InvalidConnectionCreationException e)
            {
                _log.Error(e, "Connection between {@0} and {@1} is not possible", giver, recipient);
                throw e;
            }
            catch (Exception e)
            {
                //Undo all operations
                await _connectionRepository.DeleteConnectionAsync(connection.partitionKey, connection.rowKey);
                giver.HasConfirmedMatch = false;
                await _giverRepository.InsertOrReplaceAsync(giver);
                recipient.HasConfirmedMatch = false;
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                _log.Error("An exception was thrown", e);
                throw;
            }
        }

        [HttpPost("{giverRowKey}/{recipientRowKey}/{partitionkey}/deny")]
        public async Task<ActionResult> DenyConnection(string giverRowKey, string recipientRowKey, string partitionkey, PostFeedbackGiverDto feedback)
        {
            var giver = await _giverRepository.GetGiverAsync(partitionkey, giverRowKey);
            var recipient = await _recipientRepository.GetRecipientAsync(partitionkey, recipientRowKey);

            if (giver is null || recipient is null)
            {
                return NotFound("Giver or Recipient not found"); 
            }

            if (_connectionRepository.ConnectionExists(giver, recipient))
            {
                return NotFound("Connection exists already");
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
                return NotFound("Unable to update connection");
            }

            if (feedback.DeleteGiver) // Delete giver
            {
                await _giverRepository.DeleteAsync(giver);
            }

            return Ok();
        }
    }
}