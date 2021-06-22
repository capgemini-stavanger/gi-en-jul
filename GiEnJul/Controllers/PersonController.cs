using GiEnJul.Features;
using GiEnJul.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IPersonRepository _personRepository;
        private readonly IGiverRepository _giverRepository;

        public PersonController(IPersonRepository personRepository, IGiverRepository giverRepository)
        {
            _personRepository = personRepository;
            _giverRepository = giverRepository;
        }


        [HttpGet("AddTest")]
        public async Task<ActionResult<Person>> Test()
        {
            var person = new Person("RecipientId", Guid.NewGuid().ToString()) { Age = 5, Wish = "Leke", Gender = Gender.Male, };

            var addedPerson = await _personRepository.InsertOrReplaceAsync(person);

            return CreatedAtAction(nameof(addedPerson), addedPerson);
        }
        
        [HttpGet("DeleteTest")]
        public async Task<ActionResult<Person>> Test2()
        {
            var person = new Person("RecipientId", Guid.NewGuid().ToString()) { Age = 5, Wish = "Leke", Gender = Gender.Male, };

            var addedPerson = await _personRepository.InsertOrReplaceAsync(person);
            var deleted = await _personRepository.DeleteAsync(addedPerson);
            
            return Ok(deleted);
        }

        [HttpGet("GetTest")]
        public async Task<ActionResult<Entities.Person>> Test3()
        {
            var guid = "heiheihei";
            var person = new Person("RecipientId", guid) { Age = 5, Wish = "Leke", Gender = Gender.Male, };

            await _personRepository.InsertOrReplaceAsync(person);

            return await _personRepository.GetAsync("RecipientId", guid);
        }
    }
}
