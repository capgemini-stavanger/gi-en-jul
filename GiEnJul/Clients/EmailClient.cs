using System.Threading.Tasks;
using GiEnJul.Infrastructure;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using MimeKit;
using Serilog;

namespace GiEnJul.Clients
{
    public interface IEmailClient
    {
        Task SendEmailAsync(string toMail, string toName, string subject, string html);
    }

    public class EmailClient : IEmailClient
    {
        private MailSettings _mailSettings { get; }
        private readonly IWebHostEnvironment _env;
        private readonly ILogger _log;

        public EmailClient(ISettings settings, IWebHostEnvironment env, ILogger log)
        {
            _mailSettings = settings.MailSettings;
            _env = env;
            _log = log;
        }

        public async Task SendEmailAsync(string toMail, string toName, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail));
            message.To.Add(new MailboxAddress(toName, toMail));

            message.Subject = _env.IsDevelopment() ? "DEVELOPMENT - " + subject : subject;

            message.Body = new TextPart("html")
            {
                Text = body
            };

            using (var client = new SmtpClient())
            {
                if (_env.IsDevelopment())
                {
                    await client.ConnectAsync(_mailSettings.Host, _mailSettings.Port, false);
                }
                else
                {
                    await client.ConnectAsync(_mailSettings.Host, _mailSettings.Port);
                    await client.AuthenticateAsync(_mailSettings.Mail, _mailSettings.Password);
                }

                await client.SendAsync(message);
                _log.Debug($"Sent mail to {toMail} with subject {subject}");
                await client.DisconnectAsync(true);
            }
        }
    }
}
