using AutoMapper;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {

        private readonly ILogger _log;
        private readonly IMapper _mapper;
        private readonly IEmailClient _emailClient;

        public EmailController(ILogger log, IMapper mapper, IEmailClient emailClient)
        {
            _log = log;
            _mapper = mapper;
            _emailClient = emailClient;
        }

        // POST api/email/sendEmail
        [HttpPost("send")]
        public async Task<ActionResult> SendMail(PostEmailDto email)
        {
            _log.Information("Received email post with data {@0}", email);
            if (string.IsNullOrWhiteSpace(email.RecipientName))
            {
                email.RecipientName = email.EmailAddress;
            }
            try
            {
                await _emailClient.SendEmailAsync(email.EmailAddress, email.RecipientName, email.Subject, email.Content);
            }
            catch (Exception e)
            {
                _log.Error(e, "Could not send mail to {@0}", email.EmailAddress);
                throw;
            }
            return Ok();
        }
    }
}
