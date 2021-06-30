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
            yield return new object[] { new Models.Recipient("Stavanger") };
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
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dessert = "sjokoladepudding",
                Note = "",
                Event = "JUL2021",
                FamilyMembers =
                {
                    new Models.Person("Stavanger") { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new Models.Person("Stavanger") { Age = 47, Gender = Models.Gender.Male },
                    new Models.Person("Stavanger") { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Missing dinner
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Note = "",
                Event = "JUL2021",
                FamilyMembers =
                {
                    new Models.Person("Stavanger") { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new Models.Person("Stavanger") { Age = 47, Gender = Models.Gender.Male },
                    new Models.Person("Stavanger") { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Missing dessert
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                FamilyMembers =
                {
                    new Models.Person("Stavanger") { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new Models.Person("Stavanger") { Age = 47, Gender = Models.Gender.Male },
                    new Models.Person("Stavanger") { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Missing event
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
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
            }}; // Missing contact full name
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "feil",
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
            }}; // Invalid contact email
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "abc",
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
            }}; // Invalid contact phone number
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
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
            }}; // Missing institution
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                Event = "JUL2021",
                FamilyMembers = {}
            }}; // No familyMembers
            var fm1000 = new List<Models.Person>();
            for (var i = 1; i <= 1000; i++) fm1000.Add(new Models.Person("Stavanger"));
            yield return new object[] { new Models.Recipient("Stavanger") {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                Event = "JUL2021",
                FamilyMembers = fm1000
            }}; // Too many familyMembers
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
