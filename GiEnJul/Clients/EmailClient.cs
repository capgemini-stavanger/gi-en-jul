using System.Threading.Tasks;
using GiEnJul.Infrastructure;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using MimeKit;

namespace GiEnJul.Clients
{
	public interface IEmailClient
	{
		Task SendEmailAsync((string mail, string name) to, string subject, string html);
	}

	public class EmailClient : IEmailClient
	{
		/*private readonly Settings _settings;
		private readonly IWebHostEnvironment _env;

		public EmailClient(Settings settings, IWebHostEnvironment env)
		{
			_settings = settings;
			_env = env;
		}
		*/

		public async Task SendEmailAsync((string mail, string name) to, string subject, string body)
		{
			var mailSettings = new MailSettings
			{
				Server = "127.0.0.1", Port = 465, SenderEmail = "martinsommerli@gmail.com",
				SenderName = "Martin Sommerli", Username = "martinsommerli@gmail.com", Password = ""
			};

			var message = new MimeMessage();
			message.From.Add(new MailboxAddress(mailSettings.SenderName, mailSettings.SenderEmail));
			message.To.Add(new MailboxAddress(to.name, to.mail));

			//if (_env.IsDevelopment())
				message.Subject = "DEVELOPMENT - GIENJUL: " + subject;
			//else
				message.Subject = subject;

			message.Body = new TextPart("html")
			{
				Text = body
			};

			using (var client = new SmtpClient())
			{
				client.ServerCertificateValidationCallback = (s, c, h, e) => true;

				//if (_env.IsDevelopment())
					await client.ConnectAsync(mailSettings.Server, mailSettings.Port, true);
				//else
				//	await client.ConnectAsync(mailSettings.Server);

				await client.AuthenticateAsync(mailSettings.Username, mailSettings.Password);
				await client.SendAsync(message);
				await client.DisconnectAsync(true);
			}
		}

		private class MailSettings
		{
			public string Server { get; set; }
			public int Port { get; set; }
			public string SenderName { get; set; }
			public string SenderEmail { get; set; }
			public string Username { get; set; }
			public string Password { get; set; }
		}
	}
}
