using AutoMapper;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Auth;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using GiEnJul.Repositories;
using GiEnJul.Utilities.EmailTemplates;
using System.Collections.Generic;
using GiEnJul.Utilities;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly ILogger _log;
        private readonly IMapper _mapper;
        private readonly IEmailClient _emailClient;
        private readonly IGiverRepository _giverRepository;
        private readonly IEventRepository _eventRepository;
        private readonly IEmailTemplateBuilder _emailTemplateBuilder;

        public EmailController(
            ILogger log, 
            IMapper mapper, 
            IEmailClient emailClient,
            IGiverRepository giverRepository, 
            IEventRepository eventRepository,
            IEmailTemplateBuilder emailTemplateBuilder)
        {
            _log = log;
            _mapper = mapper;
            _emailClient = emailClient;
            _giverRepository = giverRepository;
            _eventRepository = eventRepository;
            _emailTemplateBuilder = emailTemplateBuilder;
        }

        // The notification template is used to wrap content with styling
        private async Task<EmailTemplate> NotificationEmailTemplateBuilder(string content)
        {
            var emailTemplatename = EmailTemplateName.Notification;
            var emailValuesDict = new Dictionary<string, string>
                {
                    { "content", content},
                };
            var emailTemplate = await _emailTemplateBuilder.GetEmailTemplate(emailTemplatename, emailValuesDict);
            return emailTemplate;
        }

        // POST api/email/send
        [HttpPost("send")]
        [Authorize(Policy = Policy.PostEmail)]
        public async Task<ActionResult> SendMail(PostEmailDto email)
        {
            _log.Information("Received email post with data {@0}", email);
            if (string.IsNullOrWhiteSpace(email.RecipientName))
            {
                email.RecipientName = email.EmailAddress;
            }
            try
            {
                var notificationTemplate = await NotificationEmailTemplateBuilder(email.Content);
                await _emailClient.SendEmailAsync(email.EmailAddress, email.RecipientName, email.Subject, notificationTemplate.Content);
            }
            catch (Exception e)
            {
                _log.Error(e, "Could not send mail to {@0}", email.EmailAddress);
                throw;
            }
            return Ok();
        }

        [HttpPost("sendFromUser")]
        [Authorize(Policy = Policy.PostEmail)]
        public async Task<ActionResult> SendMailFromUser(PostEmailFromUserDto emailFromUser)
        {
            _log.Information("Received email post with data {@0}", emailFromUser);
            if (string.IsNullOrWhiteSpace(emailFromUser.FromName))
            {
                emailFromUser.FromName = emailFromUser.FromEmail;
            }
            if (string.IsNullOrWhiteSpace(emailFromUser.ToName))
            {
                emailFromUser.ToName = emailFromUser.ToEmail;
            }
            try
            {
                var notificationTemplate = await NotificationEmailTemplateBuilder(emailFromUser.Content);
                await _emailClient.SendEmailFromUserAsync(emailFromUser.FromEmail, emailFromUser.FromName, emailFromUser.ToEmail, emailFromUser.ToName, emailFromUser.Subject, notificationTemplate.Content);
            }
            catch (Exception e)
            {
                _log.Error(e, "Could not send mail to {@0}", emailFromUser.ToEmail);
                throw;
            }
            return Ok();
        }

        // POST api/email/givers/location
        [HttpPost("givers/location")]
        [Authorize(Policy = Policy.PostEmail)]
        public async Task<ActionResult> SendToGiversInLocation(PostLocationEmailDto email)
        {
            // Try-Catch for finding users based on location
            string activeEvent;
            try
            {
                activeEvent = await _eventRepository.GetActiveEventForLocationAsync(email.Location);
            }
            catch (System.Collections.Generic.KeyNotFoundException keyError)
            {
                _log.Error(keyError, "Could not find active event with key {@0}", email.Location);
                throw;
            }
            var giversInLocation = await _giverRepository.GetGiversByLocationAsync(activeEvent, email.Location);

            // Try-Catch for sending emails to each user in the given location
            foreach (var giver in giversInLocation)
            {
                try
                {
                    var notificationTemplate = await NotificationEmailTemplateBuilder(email.Content);
                    await _emailClient.SendEmailAsync(giver.Email, giver.Email, email.Subject, notificationTemplate.Content);
                }
                catch (Exception e)
                {
                    _log.Error(e, "Could not send mail to {@0}\nmost likely not a valid email", giver.Email);
                    throw;
                }
            }
            return Ok();
        }
    }
}
