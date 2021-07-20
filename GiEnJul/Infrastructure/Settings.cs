using Microsoft.Extensions.Configuration;

namespace GiEnJul.Infrastructure
{
    public interface ISettings
    {
        public string TableConnectionString { get; }
        public MailSettings MailSettings { get; }
    }

    public class Settings : ISettings
    {
        private readonly IConfiguration _configuration;

        public Settings(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string TableConnectionString => _configuration.GetValue<string>("TableConnectionString");
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
    }

    public class MailSettings
    {
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }


}
