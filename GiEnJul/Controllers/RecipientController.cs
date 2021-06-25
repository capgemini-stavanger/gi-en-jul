using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipientController : ControllerBase
    {
        private readonly IRecipientRepository _recipientRepository;
        private readonly IPersonRepository _personRepository;
        private readonly ILogger _log;

        public RecipientController(IRecipientRepository recipientRepository, IPersonRepository personRepository, ILogger log)
        {
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _log = log;
        }

        [HttpPost]
        public async Task<ActionResult<Entities.Recipient>> PostAsync([FromBody] Models.Recipient recipient)
        {
            _log.Debug("Adding recipient object: {@recipient}", recipient);
            var recipientId = recipient.RowKey;

            foreach (var person in recipient.FamilyMembers)
            {
                person.PartitionKey = recipientId;
                var presult = await _personRepository.InsertOrReplaceAsync(person);
                _log.Debug("Succesfully added person: {@0}", presult);
            }

            var result = await _recipientRepository.InsertOrReplaceAsync(recipient);
            _log.Debug("Succesfully added recipient: {@0}", result);
            return CreatedAtAction(nameof(result), result);
        }
    }
}
