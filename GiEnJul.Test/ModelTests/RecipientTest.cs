using GiEnJul.Dtos;
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
            yield return new object[] { new PostRecipientDto() };
            yield return new object[] { new PostRecipientDto() {
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
                    new PostPersonDto() { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new PostPersonDto() { Age = 47, Gender = Models.Gender.Male },
                    new PostPersonDto() { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; //Missing location
            yield return new object[] { new PostRecipientDto() {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dessert = "sjokoladepudding",
                Note = "",
                FamilyMembers =
                {
                    new PostPersonDto() { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new PostPersonDto() { Age = 47, Gender = Models.Gender.Male },
                    new PostPersonDto() { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Missing dinner
            yield return new object[] { new PostRecipientDto() {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Note = "",
                FamilyMembers =
                {
                    new PostPersonDto() { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new PostPersonDto() { Age = 47, Gender = Models.Gender.Male },
                    new PostPersonDto() { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Missing dessert
            yield return new object[] { new PostRecipientDto() {
                ContactEmail = "o@v.no",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                FamilyMembers =
                {
                    new PostPersonDto() { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new PostPersonDto() { Age = 47, Gender = Models.Gender.Male },
                    new PostPersonDto() { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Missing contact full name
            yield return new object[] { new PostRecipientDto() {
                ContactEmail = "feil",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                FamilyMembers =
                {
                    new PostPersonDto() { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new PostPersonDto() { Age = 47, Gender = Models.Gender.Male },
                    new PostPersonDto() { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Invalid contact email
            yield return new object[] { new PostRecipientDto() {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "abc",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                FamilyMembers =
                {
                    new PostPersonDto() { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new PostPersonDto() { Age = 47, Gender = Models.Gender.Male },
                    new PostPersonDto() { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Invalid contact phone number
            yield return new object[] { new PostRecipientDto() {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                FamilyMembers =
                {
                    new PostPersonDto() { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new PostPersonDto() { Age = 47, Gender = Models.Gender.Male },
                    new PostPersonDto() { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}; // Missing institution
            yield return new object[] { new PostRecipientDto() {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                FamilyMembers = {}
            }}; // No familyMembers
            var fm1000 = new List<PostPersonDto>();
            for (var i = 1; i <= 1000; i++) fm1000.Add(new PostPersonDto());
            yield return new object[] { new PostRecipientDto() {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                FamilyMembers = fm1000
            }}; // Too many familyMembers
        }

        [Theory]
        [MemberData(nameof(GetInvalidRecipients))]
        public void ValidateInvalidRecipientModels(PostRecipientDto model)
        {
            Assert.NotEmpty(Validator.ValidateModel(model));
        }

        [Fact]
        public void ValidateValidRecipientModel()
        {
            Assert.Empty(Validator.ValidateModel(new object[] { new PostRecipientDto() {
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
                    new PostPersonDto() { Wish = "leke", Age = 4, Gender = Models.Gender.Female },
                    new PostPersonDto() { Age = 47, Gender = Models.Gender.Male },
                    new PostPersonDto() { Wish = "sko", Age = 6, Gender = Models.Gender.Female }
                }
            }}));
        }
    }
}
