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
            if (eventDto.StartDate <= DateTime.Today || eventDto.StartDate >= eventDto.EndDate)
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
                var eventDto = await _eventRepository.GetEventByUserLocationAsync(giver.Location);

                giver.IsSuggestedMatch = true;
                giver.MatchedRecipient = connectionDto.RecipientRowKey;
                await _giverRepository.InsertOrReplaceAsync(giver);

                recipient.IsSuggestedMatch = true;
                recipient.MatchedGiver = connectionDto.GiverRowKey;
                await _recipientRepository.InsertOrReplaceAsync(recipient);

                recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);

                var title = "Gi en jul-familie - husk å bekrefte!";
                var verifyLink = $"{_settings.ReactAppUri}/{giver.RowKey}/{recipient.RowKey}/{giver.PartitionKey}";
                var recipientNote = string.IsNullOrWhiteSpace(recipient.Note) ? "" : $"Merk: {recipient.Note}.";

                var familyTable = "";
                for (var i = 0; i<recipient.PersonCount; i++)
                {
                    if (recipient.FamilyMembers != null)
                    {
                        var member = recipient.FamilyMembers[i];
                        familyTable += $"{member.ToReadableString()} <br/><br/>";
                        familyTable += " ";
                    }
                }

                var body =
                    $"Hei {giver.FullName}, <br/><br/> " +

                    $"Da har vi en familie til deg! <br/><br/> Når du har lest gjennom teksten er det viktig at du klikker på <a href='{verifyLink}'> denne linken </a> for å bekrefte at du gir familien en jul. <br/><br/>" +
                    $"Dersom du ikke har bekreftet innen <u>to dager</u> vil familien automatisk gå til en annen giver. Dette er for å sikre at alle familiene får giver. <br/><br/>" +

                    $"Din familie har nummer {recipient.FamilyId}. Dette nummeret må du skrive godt synlig på esken. Ikke pakk inn eller levér noe i plastposer. <br/><br/>" +

                    $" <h3>SKJEMA MED INFO OM FAMILIE OG GAVEØNSKER </h3>" +
                    $"{familyTable}" +

                    $" Foretrukket middag: {recipient.Dinner} og {recipient.Dessert}. {recipientNote} <br/><br/>" +


                    $"Juleeskene skal i år leveres {eventDto.DeliveryTime}, {eventDto.DeliveryDate} til {eventDto.DeliveryAddress}. <br/><br/>" +

                    $"Juleeskene skal minst inneholde en julemiddag med dessert og en gave til hver av familiemedlemmene. Dersom du ønsker, kan du bidra med én ekstra middag og/eller noe til julefrokosten. <br/><br/>" +
                    $"Middagen kan eksempelvis være pølse og potetmos, medisterkaker og poteter, kjøttdeig og spagetti, eller noe annet du synes er passende. <br/><br/>" +

                    $"Har du lyst til å legge mer oppi esken, er det selvsagt frivillig. Forslag til ekstra-ting, er: <br/><br/>" +
                    $"<ul> <li> julestrømpe med godteri til barna </li><li> saft, juice, melk, te, kaffe </li>" +
                    $"<li> frukt </li><li> snacks og julegodteri</li><li> julekaker</li><li> pålegg: Nugatti, leverpostei, kjøttpålegg, ost og så videre..</li>" +
                    $"<li> servietter, lys og julepynt</li><li> brød, julekake</li></ul><br/>" +
                    $"Pass på at ikke maten blir dårlig/sur, og vær obs på datostempel. Ikke kjøp alkoholholdig drikke! <br/>" +
                    $"Merk også at dersom familien spiser halal, betyr det at de ikke spiser svin- og da heller ikke pålegg og annet som inneholder det. <br/><br/>" +

                    $"Gaver pakkes inn og merkes med til mor, til far, til jente x år, til gutt x år og så videre. <br/><br/>" +
                    $"Det er lurt å legge byttelapp oppi. Pakk gjerne i bananesker, eller andre esker som er lette å bære. <br/><br/>" +

                    $"<br> NB! Dersom du ønsker å gi bort brukte leker eller tøy, er det viktig at dette er i god stand, og ikke erstatter julegaven." +
                    $"Vi støtter selvsagt gjenbruk, men dette er familier som sjeldent kan unne seg nye ting. <br/><br/>" +

                    $"Igjen tusen takk for at du er med på årets Gi en jul! Husk å følge med på <a href={eventDto.Facebook}>Facebook-eventet</a> hvor det kommer oppdateringer. <br/><br/>" +

                    $"Viktig: Klikk på <a href='{verifyLink}'> denne linken </a> for å bekrefte at du gir familien en jul. <br/><br/>" +

                    $"<b>PS</b>: Denne mailen kan ikke besvares. Ved spørsmål angående registreringen eller lignende, ta kontakt med {eventDto.ContactPerson} på <a href=\"mailto:{eventDto.Email}\">{eventDto.Email}</a> <br/><br/>" +

                    $"Vennlig hilsen {eventDto.ContactPerson}";


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
                .OrderBy(x => x.MaxReceivers)
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
