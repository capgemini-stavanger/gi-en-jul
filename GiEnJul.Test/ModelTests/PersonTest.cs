using GiEnJul.Models.Mappers;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace GiEnJul.Test.ModelTests
{
    public class PersonTest
    {

        public PersonTest()
        {
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
            var entityPerson = modelPerson.ToEntity();
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
            var modelPerson = entityPerson.ToModel();
            modelPerson.Wishes.ToList().ForEach(wish => Assert.Contains(wish, entityPerson.Wishes));
        }
    }
}
