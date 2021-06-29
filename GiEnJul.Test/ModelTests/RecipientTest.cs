using System.Collections.Generic;
using Xunit;

namespace GiEnJul.Test.ModelTests
{
    public class RecipientTest
    {
        public ModelValidator Validator { get; set; }
        
        public RecipientTest()
        {
            Validator = new ModelValidator();
        }


        public static IEnumerable<object[]> GetInvalidRecipients()
        {
            yield return new object[] { new Models.Recipient("") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                Event = "JUL2021",
                FamilyMembers =
                {
                    new Models.Person("Stavanger") { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new Models.Person("Stavanger") { Age = 47, Gender = Models.Gender.Male },
                    new Models.Person("Stavanger") { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; //Missing location
        }

        [Theory]
        [MemberData(nameof(GetInvalidRecipients))]
        public void ValidateInvalidRecipientModels(Models.Recipient model)
        {
            Assert.NotEmpty(Validator.ValidateModel(model));
        }

        [Fact]
        public void ValidateValidRecipientModel()
        {
            Assert.Empty(Validator.ValidateModel(new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                Event = "JUL2021",
                FamilyMembers =
                {
                    new Models.Person("Stavanger") { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new Models.Person("Stavanger") { Age = 47, Gender = Models.Gender.Male },
                    new Models.Person("Stavanger") { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}));
        }
    }
}
