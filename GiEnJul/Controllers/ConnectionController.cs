using AutoMapper;
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
using Microsoft.AspNetCore.Authorization;
using GiEnJul.Auth;

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
        [HttpPost("{giverId}/{recipientId}/{event}/verify")]
        public async Task VerifyConnection(string giverId, string recipientId, string @event)
        {
            //Populate recipient and giver using keys
            var recipient = await _recipientRepository.GetRecipientAsync(@event, recipientId);
            recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RecipientId);
            var giver = await _giverRepository.GetGiverAsync(@event, giverId);

            if (_connectionRepository.ConnectionExists(giver, recipient))
            {
                return; 
            }

            if (!ConnectionHelper.CanConnect(giver, recipient))
            {
                throw new InvalidConnectionCreationException();
            }

            (string @event, string connectedIds) connection = await _connectionRepository.InsertOrReplaceAsync(giver, recipient);

            try
            {
                giver.HasConfirmedMatch = true;
                await _giverRepository.InsertOrReplaceAsync(giver);

                recipient.HasConfirmedMatch = true;
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                var eventModel = await _eventRepository.GetEventByUserLocationAsync(giver.Location);
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
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(eventModel, "eventDto."));
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(recipient, "recipient."));

                var emailTemplate = await _emailTemplateBuilder.GetEmailTemplate(emailTemplatename, emailValuesDict);

                await _emailClient.SendEmailAsync(giver.Email, giver.FullName, emailTemplate.Subject, emailTemplate.Content);
            }
            catch (InvalidConnectionCreationException e)
            {
                _log.Error(e, "Connection between {@0} and {@1} is not possible", giver, recipient);
                throw;
            }
            catch (Exception e)
            {
                //Undo all operations
                await _connectionRepository.DeleteConnectionAsync(connection.@event, connection.connectedIds);
                giver.HasConfirmedMatch = false;
                await _giverRepository.InsertOrReplaceAsync(giver);
                recipient.HasConfirmedMatch = false;
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                _log.Error("An exception was thrown", e);
                throw;
            }
        }

        [HttpPost("{giverId}/{recipientId}/{event}/deny")]
        public async Task<ActionResult> DenyConnection(string giverId, string recipientId, string @event, PostFeedbackGiverDto feedback)
        {
            var giver = await _giverRepository.GetGiverAsync(@event, giverId);
            var recipient = await _recipientRepository.GetRecipientAsync(@event, recipientId);

            if (_connectionRepository.ConnectionExists(giver, recipient))
            {
                return BadRequest("Connection already exists");
            }

            if (!ConnectionHelper.CanConnect(giver, recipient))
            {
                return BadRequest("Connection between giver and recipient cannot be made");
            }

            var originalGiver = giver.ShallowCopy();
            var originalRecipient = recipient.ShallowCopy();

            giver.HasConfirmedMatch = false;
            giver.IsSuggestedMatch = false;
            giver.MatchedRecipient = null;
            giver.CancelFeedback = feedback.FeedbackGiver;
            giver.CancelDate = DateTime.UtcNow;
            giver.CancelFamilyId = recipient.FamilyId;

            recipient.HasConfirmedMatch = false;
            recipient.IsSuggestedMatch = false;
            recipient.MatchedGiver = null;

            var emailTemplatename = EmailTemplateName.Notification;
            var emailValuesDict = new Dictionary<string, string>
                {
                    { "content", "Dette er en bekreftelse på at du har avslått koblingen..."},
                };
            var emailTemplate = await _emailTemplateBuilder.GetEmailTemplate(emailTemplatename, emailValuesDict);

            try
            {
                await _giverRepository.InsertOrReplaceAsync(giver);
                await _recipientRepository.InsertOrReplaceAsync(recipient);
                await _emailClient.SendEmailAsync(giver.Email, giver.FullName, emailTemplate.Subject, emailTemplate.Content);
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

        [HttpPost("confirm")]
        //[Authorize(Policy = Policy.AddConnection)]
        public async Task ConfirmConnection(ConfirmConnectionDto connectionDto)
        {
            await VerifyConnection(connectionDto.GiverId, connectionDto.RecipientId, connectionDto.Event);
        }
    }
}
