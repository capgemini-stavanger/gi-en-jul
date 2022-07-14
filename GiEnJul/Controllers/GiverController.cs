using AutoMapper;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Helpers;
using GiEnJul.Models;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using GiEnJul.Utilities.Constants;
using GiEnJul.Utilities.EmailTemplates;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
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
        private readonly IEmailTemplateBuilder _emailTemplateBuilder;

        public GiverController(IGiverRepository giverRepository,
                               IEventRepository eventRepository,
                               IEmailClient emailClient,
                               ILogger log,
                               IMapper mapper,
                               IRecaptchaVerifier recaptchaVerifier,
                               IEmailTemplateBuilder emailTemplateBuilder)
        {
            _giverRepository = giverRepository;
            _eventRepository = eventRepository;
            _emailClient = emailClient;
            _log = log;
            _mapper = mapper;
            _recaptchaVerifier = recaptchaVerifier;
            _emailTemplateBuilder = emailTemplateBuilder;
        }

        // POST api/<GiverController>
        [HttpPost]
        public async Task<ActionResult<PostGiverResultDto>> PostAsync([FromBody] PostGiverDto giverDto)
        {
            var recaptchaDto = await _recaptchaVerifier.VerifyAsync(giverDto.RecaptchaToken);
            if (!recaptchaDto.Success)
            {
                _log.Information("Recaptcha denied access based on the following response: {@recaptchaDto}", recaptchaDto);
                return Forbid();
            }

            var eventModel = await _eventRepository.GetEventByUserLocationAsync(giverDto.Location);

            var giver = _mapper.Map<Giver>(giverDto);
            giver.EventName = eventModel.EventName;
            giver.Email = giver.Email.Trim();

            var giverModel = await _giverRepository.InsertOrReplaceAsync(giver);
            var insertedAsDto = _mapper.Map<PostGiverResultDto>(giverModel);

            var familyRange = "6+";
            if (giver.MaxReceivers <= FamilySize.Medium)
            {
                var minReceivers = (int)Math.Ceiling(giver.MaxReceivers / 2.0);
                familyRange = $"{minReceivers}-{giver.MaxReceivers}";
            }

            var num_givers = await _giverRepository.GetGiversCountByLocationAsync(eventModel.EventName, giverDto.Location);
            bool waiting_list = num_givers > eventModel.GiverLimit;

            var emailValuesDict = new Dictionary<string, string> { { "familyRange", familyRange } };
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(giver, "giver."));
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(eventModel, "eventDto."));

            var templateId = waiting_list ? EmailTemplateName.WaitingList : EmailTemplateName.Registered;
            var email = await _emailTemplateBuilder.GetEmailTemplate(templateId, emailValuesDict);

            try
            {
                await _emailClient.SendEmailAsync(insertedAsDto.Email, insertedAsDto.FullName, email.Subject, email.Content);
            }
            catch (Exception e)
            {
                _log.Error(e, "Could not send registration email to {@0}", giver.Email);
                await _giverRepository.DeleteAsync(giverModel);
                throw;
            }

            return CreatedAtAction(nameof(insertedAsDto), insertedAsDto);
        }
    }
}