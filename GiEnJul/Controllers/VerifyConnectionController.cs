using AutoMapper;
using GiEnJul.Clients;
using GiEnJul.Exceptions;
using GiEnJul.Helpers;
using GiEnJul.Infrastructure;
using GiEnJul.Models;
using GiEnJul.Repositories;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [Route("api/verify")]
    [ApiController]
    public class VerifyConnectionController : ControllerBase
    {
        private readonly IGiverRepository _giverRepository;
        private readonly IRecipientRepository _recipientRepository;
        private readonly IPersonRepository _personRepository;
        private readonly IConnectionRepository _connectionRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IEmailClient _emailClient;
        private readonly ILogger _log;
        private readonly IMapper _mapper;
        private readonly ISettings _settings;

        public VerifyConnectionController(
            IGiverRepository giverRepository,
            IRecipientRepository recipientRepository,
            IPersonRepository personRepository,
            IConnectionRepository connectionRepository,
            IEventRepository eventRepository,
            ILogger log,
            IMapper mapper,
            IEmailClient emailClient,
            ISettings settings)
        {
            _giverRepository = giverRepository;
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _connectionRepository = connectionRepository;
            _eventRepository = eventRepository;
            _emailClient = emailClient;
            _log = log;
            _mapper = mapper;
            _settings = settings;
        }

        // POST: /verify/giverGuid/recipientGuid/event_location
        [HttpPost("{giverRowKey}/{recipientRowKey}/{partitionkey}")]
        public async Task VerifyConnection(string giverRowKey, string recipientRowKey, string partitionkey)
        {
            //Populate recipient and giver using keys
            var recipient = await _recipientRepository.GetRecipientAsync(partitionkey, recipientRowKey);
            recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
            var giver = await _giverRepository.GetGiverAsync(partitionkey, giverRowKey);

            if (await _connectionRepository.ConnectionExists(giver, recipient))
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

                var title = $"Handleliste til familie {recipient.FamilyId}";
                var body = await ConstructEmailBodyAsync(recipient);

                await _emailClient.SendEmailAsync(giver.Email, giver.FullName, title, body);
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
                throw e;
            }
        }

        private async Task<string> ConstructEmailBodyAsync(Recipient recipient)
        {
            var deliveryAddress = await _eventRepository.GetActiveEventForLocationAsync(recipient.Location);


            var wishList = "";
            recipient.FamilyMembers.ForEach(
                person => wishList += 
                    $"<li>" +
                    $"{person.ToReadableString()}, " +
                    $"</li>");

            var foodList =
                $"<li>Middag: {recipient.Dinner}</li>" +
                $"<li>Dessert: {recipient.Dessert}</li>" +
                $"<li>Notat: {(string.IsNullOrEmpty(recipient.Note) ? "-" : recipient.Note)}</li>";

            var body = 
                $"<h1>Familie {recipient.FamilyId}</h1>" +
                "<div>" +
                $"<ul>{wishList}</ul>" +
                "<h3>Matønsker</h3>" +
                $"<ul>{foodList}</ul>" +
                $"Leveres til {deliveryAddress}, {recipient.Location}" +
                "</div>";

            return body;
        }
    }
}
