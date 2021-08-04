using GiEnJul.Dtos;
using GiEnJul.Infrastructure;
using Newtonsoft.Json;
using System.IO;
using System.Net;
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

        public RecaptchaVerifier(ISettings settings)
        {
            _secret = settings.RecaptchaSecret;
        }

        public async Task<GetRecaptchaDto> VerifyAsync(string token)
        {
            if (_secret == "") {  // Skips verification on dev
                return new GetRecaptchaDto
                {
                    Success = true
                };
            }
            var request = WebRequest.Create($"https://www.google.com/recaptcha/api/siteverify?secret={_secret}&response={token}");
            request.Method = "GET";

            var webResponse = await request.GetResponseAsync();
            var webStream = webResponse.GetResponseStream();

            using var reader = new StreamReader(webStream);
            var data = await reader.ReadToEndAsync();
            return JsonConvert.DeserializeObject<GetRecaptchaDto>(data.Replace("error-codes", "errorCodes"));
        }
    }
}
