using Microsoft.Extensions.Configuration;
using Serilog.Events;

namespace GiEnJul.Infrastructure
{
    public interface ISettings
    {
        public string TableConnectionString { get; }
        public string LogTableName { get; }
        public string RecaptchaSecret { get; }
        public string ReactAppUri { get; }
        public MailSettings MailSettings { get; }
        public Auth0Settings Auth0Settings { get; }
    }

    public class Settings : ISettings
    {
        private readonly IConfiguration _configuration;

        public Settings(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string TableConnectionString => _configuration.GetValue<string>("TableConnectionString");
        public string LogTableName => _configuration.GetValue("LogTableName", "Logs");
        public LogEventLevel LogLevel => _configuration.GetValue("LogLevel", LogEventLevel.Debug);
        public string RecaptchaSecret => _configuration.GetValue<string>("RecaptchaSecret");
        public string ReactAppUri => _configuration.GetValue<string>("ReactAppUri");
        public MailSettings MailSettings
        {
            get
            {
                var section = _configuration.GetSection("MailSettings"); //Change to OneMailSettings for noreply@gienjul.no https://www.getmailbird.com/setup/access-one-com-via-imap-smtp

                var settings = new MailSettings
                {
                    Mail = section.GetValue<string>("Mail"),
                    DisplayName = section.GetValue<string>("DisplayName"),
                    Password = section.GetValue<string>("Password"),
                    Host = section.GetValue<string>("Host"),
                    Port = section.GetValue<int>("Port"),
                };
                return settings;
            }
        }
        public Auth0Settings Auth0Settings { get
            {
                var section = _configuration.GetSection("Auth0");
                var auth0 = new Auth0Settings
                {
                    Domain = section.GetValue<string>("Domain"),
                    AzureAudience = section.GetValue<string>("AzureAudience"),
                    LocalAudience = section.GetValue<string>("LocalAudience"),
                    ManagementClientId = section.GetValue<string>("ManagementClientId"),
                    ManagementClientSecret = section.GetValue<string>("ManagementClientSecret"),
                };
                return auth0;
            } 
        }
    }

    public class MailSettings
    {
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }

    public class Auth0Settings
    {
        public string Domain { get; set; }
        public string LocalAudience { get; set; }
        public string AzureAudience { get; set; }
        public string ManagementClientId { get; set; }
        public string ManagementClientSecret { get; set; }
    }
}
