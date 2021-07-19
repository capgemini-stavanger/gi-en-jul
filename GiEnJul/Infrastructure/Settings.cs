using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

namespace GiEnJul.Infrastructure
{
    public interface ISettings
    {
        public string TableConnectionString { get; }
        public AuthorizationOptions AuthSettings { get; }
    }

    public class Settings : ISettings
    {
        private readonly IConfiguration _configuration;

        public Settings(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string TableConnectionString => _configuration.GetValue<string>("TableConnectionString");

        public AuthorizationOptions AuthSettings
        {
            get
            {
                var authoptions = new AuthorizationOptions();
                authoptions.AddPolicy("ReadGivers",policy => policy.RequireClaim("permissons","read:givers"));
                authoptions.AddPolicy("ReadRecipient",policy => policy.RequireClaim("permissons","read:recipient"));
                authoptions.AddPolicy("AddRecipient",policy => policy.RequireClaim("permissons","add:recipient"));
                authoptions.AddPolicy("UpdateRecipient",policy => policy.RequireClaim("permissons","update:recipient"));
                System.Console.WriteLine(authoptions);
                return authoptions;
            }
        }
    }
}
