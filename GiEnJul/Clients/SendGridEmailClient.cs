using GiEnJul.Infrastructure;
using GiEnJul.Repositories;
using GiEnJul.Utilities.EmailTemplates;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Clients;


public class SendGridEmailClient : IEmailClient
{
    protected const string MESSAGE_ID_HEADER = "X-Message-Id";

    private readonly Infrastructure.MailSettings _mailSettings;
    private readonly SendGridClient _client;
    private readonly IEmailStatusRepository _emailStatusRepository;

    public SendGridEmailClient(ISettings settings, IEmailStatusRepository emailStatusRepository)
    {
        _mailSettings = settings.MailSettings;
        _client = new SendGridClient(new()
        {
            ApiKey = settings.SendGridApiKey,
        });
        _emailStatusRepository = emailStatusRepository;
    }

    public async Task SendEmailAsync(string toMail, string? toName, EmailTemplate email, string? giverId = null, string? recipientId = null)
    {
        SendGridMessage msg = ConstructMessage(toMail, toName, email);

        var response = await _client.SendEmailAsync(msg);

        if (response.IsSuccessStatusCode)
        {
            await _emailStatusRepository.AddEmail(new Models.SentEmail
            {
                Email = toMail,
                Title = msg.Subject,
                SentAt = DateTime.UtcNow,
                GiverId = giverId,
                RecipientId = recipientId,
                MessageId = response.Headers.GetValues(MESSAGE_ID_HEADER).First()!,
            });
        }
    }

    private SendGridMessage ConstructMessage(string toMail, string? toName, EmailTemplate email)
    {
        var msg = new SendGridMessage
        {
            From = new(_mailSettings.Mail, _mailSettings.DisplayName),
            Subject = email.Subject,
            HtmlContent = email.SendGridBody,
        };
        msg.AddAttachment(email.SendGridAttachment);
        msg.AddTo(toMail, toName);

        return msg;
    }

    public async Task SendEmailFromUserAsync(string fromMail, string? fromName, string toMail, string? toName, EmailTemplate email, string? giverId = null, string? recipientId = null)
    {
        var msg = ConstructMessage(toMail, toName, email);
        msg.ReplyTo = new(fromMail, fromName);

        var response = await _client.SendEmailAsync(msg);

        if (response.IsSuccessStatusCode)
        {
            await _emailStatusRepository.AddEmail(new Models.SentEmail
            {
                Email = toMail,
                Title = msg.Subject,
                SentAt = DateTime.UtcNow,
                GiverId = giverId,
                RecipientId = recipientId,
                MessageId = response.Headers.GetValues(MESSAGE_ID_HEADER).First()!,
            });
        }
    }
}
