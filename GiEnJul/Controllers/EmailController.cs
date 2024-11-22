using GiEnJul.Auth;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using GiEnJul.Utilities.EmailTemplates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmailController : ControllerBase
{
    private readonly ILogger _log;
    private readonly IEmailClient _emailClient;
    private readonly IGiverRepository _giverRepository;
    private readonly IEventRepository _eventRepository;
    private readonly IEmailTemplateBuilder _emailTemplateBuilder;

    public EmailController(
        ILogger log,
        IEmailClient emailClient,
        IGiverRepository giverRepository,
        IEventRepository eventRepository,
        IEmailTemplateBuilder emailTemplateBuilder)
    {
        _log = log;
        _emailClient = emailClient;
        _giverRepository = giverRepository;
        _eventRepository = eventRepository;
        _emailTemplateBuilder = emailTemplateBuilder;
    }

    // The notification template is used to wrap content with styling
    private async Task<EmailTemplate> NotificationEmailTemplateBuilder(string content, string fromemail)
    {
        var emailTemplatename = EmailTemplateName.Notification;
        var emailValuesDict = new Dictionary<string, string>
            {
                { "content", content},
            {"fromemail",fromemail },
            };
        var emailTemplate = await _emailTemplateBuilder.GetEmailTemplate(emailTemplatename, emailValuesDict);
        return emailTemplate;
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
            var notificationTemplate = await NotificationEmailTemplateBuilder(emailFromUser.Content,emailFromUser.FromEmail);
            notificationTemplate.Subject = emailFromUser.Subject;
            await _emailClient.SendEmailFromUserAsync(emailFromUser.FromEmail, emailFromUser.FromName, emailFromUser.ToEmail, emailFromUser.ToName, notificationTemplate, emailFromUser.GiverId, emailFromUser.RecipientId);
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
        string? activeEvent;
        try
        {
            activeEvent = await _eventRepository.GetActiveEventForLocationAsync(email.Location);
        }
        catch (System.Collections.Generic.KeyNotFoundException keyError)
        {
            _log.Error(keyError, "Could not find active event with key {@0}", email.Location);
            throw;
        }
        var giversInLocation = await _giverRepository.GetGiversByLocationAsync(activeEvent!, email.Location);

        // Try-Catch for sending emails to each user in the given location
        foreach (var giver in giversInLocation)
        {
            try
            {
                var notificationTemplate = await NotificationEmailTemplateBuilder(email.Content,"");
                notificationTemplate.Subject = email.Subject;
                await _emailClient.SendEmailAsync(giver.Email, giver.Email, notificationTemplate);
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
