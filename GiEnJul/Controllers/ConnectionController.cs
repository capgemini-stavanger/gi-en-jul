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
        private readonly IMunicipalityRepository _municipalityRepository;
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
            IMunicipalityRepository municipalityRepository,
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
            _eventRepository = eventRepository;
            _municipalityRepository = municipalityRepository;
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
        public async Task<ActionResult> VerifyConnection(string giverId, string recipientId, string @event)
        {
            //Populate recipient and giver using keys
            var recipient = await _recipientRepository.GetRecipientAsync(@event, recipientId);
            recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RecipientId);
            var giver = await _giverRepository.GetGiverAsync(@event, giverId);

            if (_connectionRepository.ConnectionExists(giver, recipient))
            {
                return BadRequest("Connection already exists");
            }
            if(ConnectionHelper.CanConnect(giver, recipient))
            {
                return BadRequest("Giver and Recipient are disconnected");
            }
            if (!ConnectionHelper.MatchingIds(giver, recipient, giverId, recipientId))
            {
                return BadRequest("Giver or Recipient ID from Front-End does not correspond with Matching ID in Database");
            }

            (string @event, string connectedIds) originalConnection = await _connectionRepository.InsertOrReplaceAsync(giver, recipient);
            var originalGiver = giver.ShallowCopy();
            var originalRecipient = recipient.ShallowCopy();

            giver.HasConfirmedMatch = true;
            giver.SuggestedMatchAt = null;
            giver.RemindedAt = null;

            recipient.HasConfirmedMatch = true;

            try
            {
                await _giverRepository.InsertOrReplaceAsync(giver);
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                var eventModel = await _eventRepository.GetEventByUserLocationAsync(giver.Location);
                var municipalityModel = await _municipalityRepository.GetSingle(giver.Location);
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
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(municipalityModel, "municipalityDto."));
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(recipient, "recipient."));

                var emailTemplate = await _emailTemplateBuilder.GetEmailTemplate(emailTemplatename, emailValuesDict);

                await _emailClient.SendEmailAsync(giver.Email, giver.FullName, emailTemplate);
            }
            catch (Exception e)
            {
                //Undo all operations
                await _connectionRepository.DeleteConnectionAsync(originalConnection.@event, originalConnection.connectedIds);
                await _giverRepository.InsertOrReplaceAsync(originalGiver);
                await _recipientRepository.InsertOrReplaceAsync(originalRecipient);

                _log.Error("An exception was thrown", e);
                return NotFound("Unable to update connection");
            }

            return Ok();
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
            if (ConnectionHelper.CanConnect(giver, recipient))
            {
                return BadRequest("Giver and Recipient are disconnected");
            }
            if (!ConnectionHelper.MatchingIds(giver, recipient, giverId, recipientId))
            {
                return BadRequest("Giver or Recipient ID from Front-End does not correspond with Matching ID in Database");
            }

            var originalGiver = giver.ShallowCopy();
            var originalRecipient = recipient.ShallowCopy();

            giver.HasConfirmedMatch = false;
            giver.IsSuggestedMatch = false;
            giver.SuggestedMatchAt = null;
            giver.RemindedAt = null;
            giver.MatchedRecipient = null;
            giver.CancelFeedback = feedback.FeedbackGiver;
            giver.CancelDate = DateTime.UtcNow;
            giver.CancelFamilyId = recipient.FamilyId;

            recipient.HasConfirmedMatch = false;
            recipient.IsSuggestedMatch = false;
            recipient.MatchedGiver = null;

            var emailContent = "";
            if (feedback.DeleteGiver) {
                emailContent = "Dette er en bekreftelse på at du har avslått den foreslåtte koblingen. " +
                    "Vi forstår at du ønsker å trekke deg som giver. Om du skulle ombestemme deg er det alltids mulig å registrere seg på nytt!";
            } else
            {
                emailContent = "Dette er en bekreftelse på at du har avslått den foreslåtte koblingen. " +
                    "Vi setter pris på din tilbakemelding og tar den i betraktning ved neste forslag.";
            }

            try
            {
                await _giverRepository.InsertOrReplaceAsync(giver);
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                // Noreply email to giver
                var municipalityModel = await _municipalityRepository.GetSingle(giver.Location);
                var emailTemplatename = EmailTemplateName.ConnectionDenied; // Change to ConnectionDenied
                var emailValuesDict = new Dictionary<string, string>
                {
                    { "content", emailContent},
                };
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(giver, "giver."));
                emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(municipalityModel, "municipalityDto."));
                var emailTemplate = await _emailTemplateBuilder.GetEmailTemplate(emailTemplatename, emailValuesDict);
                await _emailClient.SendEmailAsync(giver.Email, giver.FullName, emailTemplate);

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

                // Send email to ADMIN with deleted giver (?)
            }

            return Ok();
        }

        [HttpPost("confirm")]
        //[Authorize(Policy = Policy.AddConnection)] POLICY SHOULD BE ADMIN 
        public async Task ConfirmConnection(ConfirmConnectionDto connectionDto)
        {
            await VerifyConnection(connectionDto.GiverId, connectionDto.RecipientId, connectionDto.Event);
        }


        [HttpGet("connectionStatus")]
        public async Task<ActionResult> ConnectionStatus(string giverId, string recipientId, string @event)
        {
            var giver = await _giverRepository.GetGiverAsync(@event, giverId);
            var recipient = await _recipientRepository.GetRecipientAsync(@event, recipientId);

            // Check connection
            if (_connectionRepository.ConnectionExists(giver, recipient))
            {
                return BadRequest("Connection already exists");
            }
            if (ConnectionHelper.CanConnect(giver, recipient))
            {
                return BadRequest("Giver and Recipient are disconnected");
            }
            if (!ConnectionHelper.MatchingIds(giver, recipient, giverId, recipientId))
            {
                return BadRequest("Giver or Recipient ID from Front-End does not correspond with Matching ID in Database");
            }

            return Ok("Godkjent kobling");
        }

    }
}
