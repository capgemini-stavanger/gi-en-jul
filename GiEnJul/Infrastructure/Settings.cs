using Microsoft.Extensions.Configuration;

namespace GiEnJul.Infrastructure
{
    public interface ISettings
    {
        public string TableConnectionString { get; }
    }

    public class Settings : ISettings
    {
        private readonly IConfiguration _configuration;

        public Settings(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string TableConnectionString => _configuration.GetValue<string>("LocalTableConnection");
    }
}
