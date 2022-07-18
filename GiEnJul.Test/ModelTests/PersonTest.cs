using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using GiEnJul.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            modelPerson.Wishes.ToList().ForEach(wish => Assert.True(entityPerson.Wishes.Contains(wish)));
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
            modelPerson.Wishes.ToList().ForEach(wish => Assert.True(entityPerson.Wishes.Contains(wish)));
        }
    }
}
