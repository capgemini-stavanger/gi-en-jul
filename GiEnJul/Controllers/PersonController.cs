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
            var giver = new Giver("idd", Guid.NewGuid().ToString()) {MaxRecievers=6, FullName="Jonny Hansen", Email="JonnyH@gmail.com", PhoneNumber=99944876 };

            var addedPerson = await _personRepository.InsertOrReplaceAsync(person);
            var addedGiver = await _giverRepository.InsertOrReplaceAsync(giver);

            return CreatedAtAction(nameof(addedPerson), addedPerson, addedGiver);
        }
        
        [HttpGet("DeleteTest")]
        public async Task<ActionResult<Giver>> Test2()
        {
            var person = new Person("RecipientId", Guid.NewGuid().ToString()) { Age = 5, Wish = "Leke", Gender = Gender.Male, };

            var addedPerson = await _personRepository.InsertOrReplaceAsync(person);
            var deleted = await _personRepository.DeleteAsync(addedPerson);
            
            var giver1 = new Giver("id1", Guid.NewGuid().ToString()) { MaxRecievers = 6, FullName = "Jonny Hansen2", Email = "JonnyH@gmail.com", PhoneNumber = 99944876 };
            
            var addedGiver1 = await _giverRepository.InsertOrReplaceAsync(giver1);
            var deleted_giver = await _giverRepository.DeleteAsync(giver1);

            return Ok(deleted_giver);
        }

        [HttpGet("GetTest")]
        public async Task<ActionResult<Entities.Giver>> Test3()
        {
            var guid = "heiheihei";
            var person = new Person("RecipientId", guid) { Age = 5, Wish = "Leke", Gender = Gender.Male, };
            var guid2 = "ThisIsID";
            var giver2 = new Giver("Stav", guid2) { MaxRecievers = 3, FullName = "Benny Johnson", Email = "Benn@gmail.com", PhoneNumber = 99109222 };

            await _personRepository.InsertOrReplaceAsync(person);
            await _giverRepository.InsertOrReplaceAsync(giver2);

            return await _giverRepository.GetAsync("ThisIsID", guid2);
        }
    }
}
