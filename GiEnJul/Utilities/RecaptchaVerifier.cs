using GiEnJul.Dtos;
using GiEnJul.Infrastructure;
using Newtonsoft.Json;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace GiEnJul.Utilities
{
    public interface IRecaptchaVerifier
    {
        Task<GetRecaptchaDto> VerifyAsync(string token);
    }

    public class RecaptchaVerifier : IRecaptchaVerifier
    {
        private readonly string _secret;
        private readonly HttpClient _httpClient;

        public RecaptchaVerifier(ISettings settings, HttpClient httpClient)
        {
            _secret = settings.RecaptchaSecret;
            _httpClient = httpClient;
        }

        public async Task<GetRecaptchaDto> VerifyAsync(string token)
        {
            if (_secret == "") {  // Skips verification on dev
                return new GetRecaptchaDto
                {
                    Success = true
                };
            }

            var response = await _httpClient.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret={_secret}&response={token}");
            var webStream = response.Content.ReadAsStream();

            using var reader = new StreamReader(webStream);
            var data = await reader.ReadToEndAsync();
            return JsonConvert.DeserializeObject<GetRecaptchaDto>(data.Replace("error-codes", "errorCodes"));
        }
    }
}
