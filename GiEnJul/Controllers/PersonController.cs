using AutoMapper;
using GiEnJul.Features;
using GiEnJul.Models;
using GiEnJul.Entities;
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
        private IMapper _mapper;


        public PersonController(IPersonRepository personRepository, IMapper mapper)
        {
            _personRepository = personRepository;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<Model eller Entity>> Add(Models.Person person)
        {
            
            
            person = new Models.Person(Guid.NewGuid().ToString(), "ID FROM NAV") { Age = 5, Wish = "Leke", Gender = Gender.Male, };


            var addedPerson = await _personRepository.InsertOrReplaceAsync(_mapper.Map<Entities.Person>(person));

            //TODO Return type Model eller Entity ? Map til den det skal være om nødvendig
            return CreatedAtAction(nameof(addedPerson), addedPerson);
        }
    }
}
