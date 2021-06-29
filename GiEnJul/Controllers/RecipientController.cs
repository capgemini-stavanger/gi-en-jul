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
            if (string.IsNullOrEmpty(recipient.Location)) {
                var e = new Exception("Cannot add recipient with no location.");
                _log.Error("Exception occurred while trying to add recipient: {@0}. \n{@1}", recipient, e);
                throw e;
            }
            recipient.FamilyMembers.ForEach(person => person.PartitionKey = recipient.RowKey);
            await _personRepository.InsertOrReplaceBatchAsync(recipient.FamilyMembers);
            try
            {
                var result = await _recipientRepository.InsertOrReplaceAsync(recipient);
                _log.Debug("Succesfully added recipient: {@0}", result);
                return CreatedAtAction(nameof(result), result);
            }
            catch (Exception e)
            {
                await _personRepository.DeleteBatchAsync(recipient.FamilyMembers);
                throw e;
            }
        }
    }
}
