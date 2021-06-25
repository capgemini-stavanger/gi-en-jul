using System.Collections.Generic;
using Xunit;

namespace GiEnJul.Test.ModelTests
{
    public class GiverTest
    {
        public ModelValidator Validator { get; set; }
        
        public GiverTest(ModelValidator validator)
        {
            Validator = validator;
        }


        public static IEnumerable<object[]> GetInvalidGivers()
        {
            yield return new object[] { new Models.Giver("Location") }; //Missing members
            yield return new object[] { new Models.Giver("Stavanger") { FullName = "Test Testesen", Email = "Test@Testesen.com", PhoneNumber = "12345678", MaxRecievers = 0 } }; //Invalid MaxRecivers
            yield return new object[] { new Models.Giver("Stavanger") { FullName = "", Email = "Test@Testesen.com", PhoneNumber = "12345678", MaxRecievers = 5 } }; //Invalid Name
            yield return new object[] { new Models.Giver("Stavanger") { FullName = "Test Testesen", Email = "Invalid Mail", PhoneNumber = "12345678", MaxRecievers = 5 } }; //Invalid Mail
            yield return new object[] { new Models.Giver("Stavanger") { FullName = "Test Testesen", Email = "Test@Testesen.com", PhoneNumber = "Invalid ", MaxRecievers = 5 } }; //Invalid PhoneNumber
        }

        [Theory]
        [MemberData(nameof(GetInvalidGivers))]
        public void ValidateInvalidGiverModels(Models.Giver model)
        {
            Assert.NotEmpty(Validator.ValidateModel(model));
        }

        [Fact]
        public void ValidateValidGiverModel()
        {
            Assert.Empty(Validator.ValidateModel(new Models.Giver("Stavanger") { FullName = "Test Testesen", Email = "Test@Testesen.com", PhoneNumber = "12345678", MaxRecievers = 1 }));
        }

    }
}
