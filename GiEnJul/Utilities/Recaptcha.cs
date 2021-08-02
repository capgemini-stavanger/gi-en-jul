using GiEnJul.Dtos;
using Newtonsoft.Json;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace GiEnJul.Utilities
{
    public class Recaptcha
    {
        public Recaptcha(string secret, string token)
        {
            Secret = secret;
            Token = token;
        }

        private string Secret { get; set; }
        private string Token { get; set; }

        public async Task<GetRecaptchaDto> VerifyAsync()
        {
            /*if (Secret == "") {  // Skips verification on dev
                return new GetRecaptchaDto
                {
                    Success = true
                };
            } */  // This code should be added after the recaptcha has been tested on prod
            var request = WebRequest.Create($"https://www.google.com/recaptcha/api/siteverify?secret={Secret}&response={Token}");
            request.Method = "GET";

            var webResponse = await request.GetResponseAsync();
            var webStream = webResponse.GetResponseStream();

            using var reader = new StreamReader(webStream);
            var data = await reader.ReadToEndAsync();
            return JsonConvert.DeserializeObject<GetRecaptchaDto>(data.Replace("error-codes", "errorCodes"));
        }
    }
}
