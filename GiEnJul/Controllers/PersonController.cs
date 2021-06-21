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

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }


        [HttpGet("AddTest")]
        public async Task<ActionResult<Person>> Test()
        {
            var person = new Person("ID FROM NAV", Guid.NewGuid().ToString()) { Age = 5, Wish = "Leke", Gender = Gender.Male, };
            
            var addedPerson = await _personRepository.InsertOrReplaceAsync(person);

            return CreatedAtAction(nameof(addedPerson), addedPerson);
        }
        
        [HttpGet("DeleteTest")]
        public async Task<ActionResult<Person>> Test2()
        {
            var person = new Person("ID FROM NAV", Guid.NewGuid().ToString()) { Age = 5, Wish = "Leke", Gender = Gender.Male, };
            
            var addedPerson = await _personRepository.InsertOrReplaceAsync(person);
            var deleted = await _personRepository.DeleteAsync(addedPerson);

            return Ok(deleted);
        }

        [HttpGet("GetTest")]
        public async Task<ActionResult<Entities.Person>> Test3()
        {
            var guid = "heiheihei";
            var person = new Person("ID FROM NAV", guid) { Age = 5, Wish = "Leke", Gender = Gender.Male, };

            await _personRepository.InsertOrReplaceAsync(person);

            return await _personRepository.GetAsync("ID FROM NAV", guid);
        }
    }
}
