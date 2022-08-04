using AutoMapper;
using GiEnJul.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace GiEnJul.Test.ModelTests
{
    public class PersonTest
    {
        private readonly IMapper _mapper;

        public PersonTest()
        {
            _mapper = AutoMapperConfiguration.Initialize();
        }

        [Fact]
        public void ValidateModelToEntityWishes()
        {
            var modelPerson = new Models.Person
            {
                PersonId = "1",
                RecipientId = "1",
                Wishes = new List<string>
                {
                    "Test",
                    "Setning"
                }
            };
            var entityPerson = _mapper.Map<Entities.Person>(modelPerson);
            modelPerson.Wishes.ToList().ForEach(wish => Assert.Contains(wish, entityPerson.Wishes));
        }

        [Fact]
        public void ValidateEntityToModelWishes()
        {
            var entityPerson = new Entities.Person
            {
                RowKey = "1",
                PartitionKey = "1",
                Wishes = "[\"Test\", \"Setning\"]"
            };
            var modelPerson = _mapper.Map<Models.Person>(entityPerson);
            modelPerson.Wishes.ToList().ForEach(wish => Assert.Contains(wish, entityPerson.Wishes));
        }
    }
}
