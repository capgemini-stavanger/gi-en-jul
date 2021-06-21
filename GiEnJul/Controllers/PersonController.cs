using GiEnJul.Features;
using GiEnJul.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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


        [HttpGet]
        public async Task<Person> AddAsync()
        {
            // Send inn Model til repository, konverter Model til Entity i det operasjonen skal gjennomføres

            var person = new Person(Guid.NewGuid().ToString(), "ID FROM NAV") { Age = 5, Wish = "Leke", Gender = Gender.Male,  };

            return await _personRepository.InsertOrReplaceAsync(person);

        }
    }
}
