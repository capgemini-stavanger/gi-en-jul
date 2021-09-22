using AutoMapper;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Models;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Linq;
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

            var (giver_limit, active_event) = await _eventRepository.GetGiverLimitAndEventNameForLocationAsync(giverDto.Location);

            var giver = _mapper.Map<Giver>(giverDto);
            giver.EventName = await _eventRepository.GetActiveEventForLocationAsync(giverDto.Location);

            var insertedAsDto = _mapper.Map<PostGiverResultDto>(await _giverRepository.InsertOrReplaceAsync(giver));

            var givers_in_event = await _giverRepository.GetGiversByLocationAsync(active_event, giverDto.Location);
            var num_givers = givers_in_event.Count();
            bool waiting_list = num_givers > giver_limit;

            var messageContent =
                $"<h2>Hjertelig takk, {insertedAsDto.FullName}!</h2>" +
                $"Da er du registrert! Vit at familiene setter utrolig stor pris på dette, " +
                $"og barnevernet forteller om mange tårevåte øyeblikk når familiene får eskene sine.<br/>" +
                $"{(waiting_list ? $"</br>Grunnet stor pågang har du havnet i ventelisten.</br>Din posisjon i ventelisten er: {num_givers-giver_limit}.</br></br>" : "")}" + 
                $"Når det nærmer seg jul vil du motta mer informasjon om familien du skal gi en jul. " +
                $"Da får du også ønskelister, sted og tidspunkt for innlevering av juleesken.</br></br>" +
                $"Følg også med på Gi en jul sin <a href='https://www.facebook.com/gienjul'>Facebook - side</a>. Igjen tusen takk, ditt bidrag betyr veldig mye!";

            await _emailClient.SendEmailAsync(insertedAsDto.Email, insertedAsDto.FullName, "Takk for din registrering!", messageContent);

            return CreatedAtAction(nameof(insertedAsDto), insertedAsDto);
        }
    }
}