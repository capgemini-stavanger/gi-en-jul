﻿using AutoMapper;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Models;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Linq;
using System;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiverController : ControllerBase
    {
        private readonly IGiverRepository _giverRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IEmailClient _emailClient;
        private readonly ILogger _log;
        private readonly IMapper _mapper;
        private readonly IRecaptchaVerifier _recaptchaVerifier;

        public GiverController(IGiverRepository giverRepository,
                               IEventRepository eventRepository,
                               IEmailClient emailClient,
                               ILogger log,
                               IMapper mapper,
                               IRecaptchaVerifier recaptchaVerifier)
        {
            _giverRepository = giverRepository;
            _eventRepository = eventRepository;
            _emailClient = emailClient;
            _log = log;
            _mapper = mapper;
            _recaptchaVerifier = recaptchaVerifier;
        }

        // POST api/<GiverController>
        [HttpPost]
        public async Task<ActionResult<PostGiverResultDto>> PostAsync([FromBody] PostGiverDto giverDto)
        {
            var recaptchaDto = await _recaptchaVerifier.VerifyAsync(giverDto.RecaptchaToken);
            if (!recaptchaDto.Success)
            {
                _log.Information($"Recaptcha denied access based on the following response: {recaptchaDto}");
                return Forbid();
            }

            var eventDto = await _eventRepository.GetEventByUserLocationAsync(giverDto.Location);

            var giver = _mapper.Map<Giver>(giverDto);
            giver.EventName = eventDto.PartitionKey;
            giver.Email = giver.Email.Trim();

            var giverModel = await _giverRepository.InsertOrReplaceAsync(giver);
            var insertedAsDto = _mapper.Map<PostGiverResultDto>(giverModel);

            var familysize = "6+";
            if (giver.MaxReceivers < 6)
            {
                var minReceivers = (int)Math.Ceiling(giver.MaxReceivers / 2.0);
                familysize = $"{minReceivers}-{giver.MaxReceivers}";
            }

            var (giver_limit, active_event) = await _eventRepository.GetGiverLimitAndEventNameForLocationAsync(giverDto.Location);
            var givers_in_event = await _giverRepository.GetGiversByLocationAsync(active_event, giverDto.Location);
            var num_givers = givers_in_event.Count();
            bool waiting_list = num_givers > giver_limit;

            var messageContent =
                $"Hei!</br></br>" +
                $"Tusen takk for at du har meldt deg som giver til årets Gi en jul. Så snart vi har en familie til deg," +
                $"vil du motta en epost med mer informasjon. Vi deler ut familier fortløpende, og inntil et par uker før innlevering. <br/><br/>" +

                $"{(waiting_list ? $"<b>Grunnet stor pågang har du havnet i ventelisten.</b></br><b>Det er dermed ikke sikkert at du vil bli tildelt en familie.</b></br></br>" : "")}" +

                $"Din informasjon:" +
                $"<ul>" +
                $"<li>Kommune: {giver.Location}</li>" +
                $"<li>Navn: {giver.FullName}</li>" +
                $"<li>Epost: {giver.Email}</li>" +
                $"<li>Telefonnummer: {giver.PhoneNumber}</li>" +
                $"<li>Familiestørrelse: {familysize} personer</li>" +
                $"<li>Registreringsdato: {giver.RegistrationDate.ToShortDateString()}</li>" +
                $"</ul></br>" +

                $"Leveringsinformasjon:</br>" +
                $"<ul>" +
                $"<li>Dato: {eventDto.DeliveryDate}</li>" +
                $"<li>Tid: {eventDto.DeliveryTime}</li>" +
                $"<li>Sted: <a href={eventDto.DeliveryGPS}>{eventDto.DeliveryAddress}</a></li>" +
                $"</ul></br>" +

                $"Juleeskene skal minst inneholde en julemiddag med dessert og en gave til hvert av familiemedlemmene. Du får vite mat- og gaveønsker når du får familien. <br/><br/>" +

                $"Dersom du ønsker, kan du bidra med én ekstra middag og/eller noe til julefrokosten. Middagen kan <br/>" +
                $"eksempelvis være pølse og potetmos, medisterkaker og poteter, kjøttdeig og spaghetti, eller noe annet du synes er passende. <br/><br/>" +

                $"Har du lyst til å legge mer oppi esken, er det selvsagt frivillig. Forslag til ekstra-ting, er: <br/>" +
                $"<ul> <li> julestrømpe med godteri til barna </li><li> saft, juice, melk, te, kaffe </li>" +
                $"<li> frukt </li><li> snacks og julegodteri</li><li> julekaker</li><li> pålegg: Nugatti, leverpostei, kjøttpålegg, ost og så videre..</li>" +
                $"<li> servietter, lys og julepynt</li><li> brød, julekake</li></ul><br/>" +
                $"Pass på at ikke maten blir dårlig/sur, og vær obs på datostempel. Ikke kjøp alkoholholdig drikke! <br/>" +
                $"<h3>Innkjøp av julegaver </h3>" +
                $"Husk at det er gaveønsker og ikke handleliste som må følges til punkt og prikke. Dersom ønskene er gavekort, kan du likevel kjøpe en gave du synes passer til alderen.<br/><br/>" +

                $"Gaver pakkes inn og merkes med til mor, til far, til jente x år, til gutt x år og så videre." +
                $"Det er lurt å legge byttelapp oppi esken. Pakk gjerne i bananesker, eller andre esker som er enkle å bære.<br/><br/>" +

                $"NB! Dersom du ønsker å gi bort brukte leker eller tøy, er det viktig at dette er i god stand, og ikke erstatter julegaven." +
                $"Vi støtter selvsagt gjenbruk, men dette er familier som sjeldent kan unne seg nye ting.<br/><br/>" +

                $"Igjen vil vi si tusen takk for at du har meldt seg som giver! Vi håper du har fått informasjonen du trenger, <br/>" +
                $"og lurer du på noe i mellomtiden ber vi deg ta en titt på ofte stilte spørsmål på <a href='https://gienjul.no'>nettsiden<a/>, og følg gjerne med på <a href='https://www.facebook.com/gienjul'>facebook-eventet<a/>.<br/><br/>" +

                $"<b>PS</b>: Denne mailen kan ikke besvares. Ved spørsmål angående registreringen eller lignende, ta kontakt med {eventDto.ContactPerson} på <a href=\"mailto:{eventDto.Email}\">{eventDto.Email}</a> <br/><br/>" +

                $"Vennlig hilsen {eventDto.ContactPerson}";

            try
            {
                await _emailClient.SendEmailAsync(insertedAsDto.Email, insertedAsDto.FullName, "Gi en jul - registrering og informasjon!", messageContent);
            }
            catch (Exception e)
            {
                _log.Error(e, "Could not send registration email to {@0}", giver.Email);
                await _giverRepository.DeleteAsync(giverModel);
                throw e;
            }


            return CreatedAtAction(nameof(insertedAsDto), insertedAsDto);
        }
    }
}