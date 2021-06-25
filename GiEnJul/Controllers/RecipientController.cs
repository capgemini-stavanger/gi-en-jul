using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
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
            List<Entities.Person> addedPeople = new List<Entities.Person>();

            for (var i = 0; i < recipient.FamilyMembers.Count; i++)
            {
                var person = recipient.FamilyMembers[i];
                person.PartitionKey = recipientId;
                try
                {
                    var presult = await _personRepository.InsertOrReplaceAsync(person);
                    _log.Debug("Succesfully added person: {@0}", presult);
                    addedPeople.Add(presult);
                }
                catch (Exception e)
                {
                    _log.Error("Exception while trying to add Person:{@person}", person);
                    try
                    {
                        await _personRepository.DeleteAsyncMultiple(addedPeople);
                    }
                    finally
                    {
                        throw e;
                    }
                }
            }

            try
            {
                var result = await _recipientRepository.InsertOrReplaceAsync(recipient);
                _log.Debug("Succesfully added recipient: {@0}", result);
                return CreatedAtAction(nameof(result), result);
            }
            catch (Exception e)
            {
                _log.Error("Exception while trying to add Recipent:{@recipient}", recipient);
                try
                {
                    await _personRepository.DeleteAsyncMultiple(addedPeople);
                }
                finally
                {
                    throw e;
                }
            }
        }
    }
}
