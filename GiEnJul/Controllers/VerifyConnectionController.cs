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
                throw new AlreadyConnectedException("This connection is already created");
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
            catch (AlreadyConnectedException e)
            {
                _log.Error(e, "Connection between {@0} and {@1} is already registered", giver, recipient);
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

            var information = $"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum massa vel blandit faucibus. Maecenas sed nisi ornare, pretium sapien nec, sollicitudin enim. Suspendisse sem urna, porta sed nulla id, vulputate hendrerit tellus. Nullam sagittis, enim eu facilisis hendrerit, velit ex vulputate mi, a rutrum nibh velit ac purus. Praesent tincidunt vehicula interdum. Sed viverra nulla sed vehicula sollicitudin. Pellentesque porttitor velit vel nulla ultricies sodales. Etiam id massa sed neque lobortis congue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis lacinia metus neque, id bibendum sem vulputate a. Nunc ultricies placerat tellus, sed volutpat ex sodales vitae. Curabitur suscipit in sem quis sollicitudin. Donec pharetra ipsum eget ante congue iaculis.Donec mollis elit nibh, non suscipit diam imperdiet vitae. Aenean a pretium felis. Donec ornare, urna vitae egestas consectetur, ligula nisl condimentum est, a pellentesque nunc enim eu mauris.Morbi volutpat et odio ac tincidunt. Aenean vel leo id nunc cursus dignissim.Nullam ac erat faucibus, efficitur enim sit amet, fringilla tortor. Quisque tincidunt egestas felis, ut rutrum tellus rutrum vel. Sed vitae nisl id enim maximus ornare porttitor eu dolor. Maecenas non semper est, varius tristique tortor. Fusce ornare enim felis, in ullamcorper orci aliquam sit amet.";

            var wishList = "";
            recipient.FamilyMembers.ForEach(
                person => wishList += 
                    $"<li>" +
                    $"{GenderToString(person)}, " +
                    $"{person.Age} år, " +
                    $"{(string.IsNullOrEmpty(person.Wish) ? "Ønske ikke spesifisert" : person.Wish)}" +
                    $"</li>");

            var foodList =
                $"<li>Middag: {recipient.Dinner}</li>" +
                $"<li>Dessert: {recipient.Dessert}</li>" +
                $"<li>Notat: {(string.IsNullOrEmpty(recipient.Note) ? "-" : recipient.Note)}</li>";

            var body = 
                information +
                $"<h1>Familie {recipient.FamilyId}</h1>" +
                "<div>" +
                $"<ul>{wishList}</ul>" +
                "<h3>Matønsker</h3>" +
                $"<ul>{foodList}</ul>" +
                $"Leveres til {deliveryAddress}, {recipient.Location}" +
                "</div>";

            return body;
        }

        private string GenderToString(Person person)
        {
            switch (person.Gender)
            {
                case Gender.Female:
                    return person.Age > 18 ? "Kvinne" : "Jente";
                case Gender.Male:
                    return person.Age > 18 ? "Mann" : "Gutt";
                case Gender.Unspecified:
                default:
                    return "Ikke spesifisert";
            }
        }
    }
}
