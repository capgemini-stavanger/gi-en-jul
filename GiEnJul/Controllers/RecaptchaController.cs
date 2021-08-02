using GiEnJul.Dtos;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using System;
using Serilog;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecaptchaController : ControllerBase
    {

        private readonly ILogger _log;
        public RecaptchaController(ILogger log)
        {
            _log = log;
        }

        [HttpGet("{token}")]
        public async Task<bool> VerifyToken(string token)
        {
            var secret = Environment.GetEnvironmentVariable("RECAPTCHA_SECRET");
            var request = WebRequest.Create($"https://www.google.com/recaptcha/api/siteverify?secret={secret}&response={token}");
            request.Method = "GET";

            var webResponse = await request.GetResponseAsync();
            var webStream = webResponse.GetResponseStream();

            using var reader = new StreamReader(webStream);
            var data = await reader.ReadToEndAsync();
            var response = JsonConvert.DeserializeObject<GetRecaptchaDto>(data.Replace("error-codes", "errorCodes"));
            if (!response.Success)
            {
                _log.Information($"Repcaptcha denied access based on the following response: {response}");
            }
            return response.Success;
        }
    }
}
