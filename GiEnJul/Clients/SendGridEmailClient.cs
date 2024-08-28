using GiEnJul.Infrastructure;
using GiEnJul.Utilities.EmailTemplates;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace GiEnJul.Clients;

public class SendGridEmailClient : IEmailClient
{
    private readonly Infrastructure.MailSettings _mailSettings;
    private readonly SendGridClient _client;

    public SendGridEmailClient(ISettings settings)
    {
        _mailSettings = settings.MailSettings;
        _client = new SendGridClient(new()
        {
            ApiKey = settings.SendGridApiKey,
        });
    }
    public async Task SendEmailAsync(string toMail, string toName, EmailTemplate email)
    {
        SendGridMessage msg = ConstructMessage(toMail, toName, email);

        await _client.SendEmailAsync(msg);
    }

    private SendGridMessage ConstructMessage(string toMail, string toName, EmailTemplate email)
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

    public async Task SendEmailFromUserAsync(string fromMail, string fromName, string toMail, string toName, EmailTemplate email)
    {
        var msg = ConstructMessage(toMail, toName, email);
        msg.ReplyTo = new(fromMail, fromName);

        await _client.SendEmailAsync(msg);
    }
}
