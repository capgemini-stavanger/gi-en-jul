using Microsoft.Extensions.Configuration;
using Serilog.Events;
using System;

namespace GiEnJul.Infrastructure;

public interface ISettings
{
    public string TableConnectionString { get; }
    public string LogTableName { get; }
    public string RecaptchaSecret { get; }
    public string ReactAppUri { get; }
    public string SendGridApiKey { get; }
    public string SendGridWebhookVerificationKey { get; }
    public MailSettings MailSettings { get; }
    public Auth0Settings Auth0Settings { get; }
    public CleanupJob CleanupJob { get; }
}

public class Settings : ISettings
{
    private readonly IConfiguration _configuration;

    public Settings(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string TableConnectionString => _configuration.GetValue<string>("TableConnectionString") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(TableConnectionString));
    public string LogTableName => _configuration.GetValue("LogTableName", "Logs") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(LogTableName));
    public LogEventLevel LogLevel => _configuration.GetValue("LogLevel", LogEventLevel.Debug);
    public string RecaptchaSecret => _configuration.GetValue<string>("RecaptchaSecret") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(RecaptchaSecret));
    public string ReactAppUri => _configuration.GetValue<string>("ReactAppUri") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(ReactAppUri));
    public string SendGridApiKey => _configuration.GetValue<string>("SendGridApiKey") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(SendGridApiKey));
    public string SendGridWebhookVerificationKey => _configuration.GetValue<string>("SendGridWebhookVerificationKey") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(SendGridWebhookVerificationKey));

    public MailSettings MailSettings
    {
        get
        {
            var section = _configuration.GetSection("MailSettings") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(MailSettings)); //Change to OneMailSettings for noreply@gienjul.no https://www.getmailbird.com/setup/access-one-com-via-imap-smtp

            var settings = new MailSettings
            {
                Mail = section.GetValue<string>("Mail")!,
                DisplayName = section.GetValue<string>("DisplayName")!,
                Password = section.GetValue<string>("Password")!,
                Host = section.GetValue<string>("Host")!,
                Port = section.GetValue<int>("Port"),
            };
            return settings;
        }
    }

    public Auth0Settings Auth0Settings
    {
        get
        {
            var section = _configuration.GetSection("Auth0") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(Auth0Settings));
            var auth0 = new Auth0Settings
            {
                Domain = section.GetValue<string>("Domain")!,
                AzureAudience = section.GetValue<string>("AzureAudience")!,
                LocalAudience = section.GetValue<string>("LocalAudience")!,
                ManagementClientId = section.GetValue<string>("ManagementClientId")!,
                ManagementClientSecret = section.GetValue<string>("ManagementClientSecret")!,
                Admin = section.GetValue<string>("AdminRole")!,
                Institution = section.GetValue<string>("InstitutionRole")!,
                SuperAdmin = section.GetValue<string>("SuperAdminRole")!
            };
            return auth0;
        }
    }

    public CleanupJob CleanupJob
    {
        get
        {
            var section = _configuration.GetSection("CleanupJob") ?? throw new ArgumentException("unable to read configuration for {param}", nameof(CleanupJob));
            var cleanup = new CleanupJob
            {
                EndDaySensitivity = section.GetValue<int>("EndDaySensitiviity"),
                NormalDaySensitivity = section.GetValue<int>("NormalDaySensitivity")
            };
            return cleanup;
        }
    }
}

public class MailSettings
{
    public string Mail { get; set; } = null!;
    public string DisplayName { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Host { get; set; } = null!;
    public int Port { get; set; }
}

public class Auth0Settings
{
    public string Domain { get; set; } = null!;
    public string LocalAudience { get; set; } = null!;
    public string AzureAudience { get; set; } = null!;
    public string ManagementClientId { get; set; } = null!;
    public string ManagementClientSecret { get; set; } = null!;
    public string Admin { get; set; } = null!;
    public string Institution { get; set; } = null!;
    public string SuperAdmin { get; set; } = null!;
}

public class CleanupJob
{
    public int NormalDaySensitivity { get; set; }
    public int EndDaySensitivity { get; set; }
}