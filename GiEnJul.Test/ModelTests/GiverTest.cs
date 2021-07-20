using GiEnJul.Dtos;
using System.Collections.Generic;
using Xunit;

namespace GiEnJul.Test.ModelTests
{
    public class GiverTest
    {
        public ModelValidator Validator { get; set; }

        public GiverTest()
        {
            Validator = new ModelValidator();
        }

        public static IEnumerable<object[]> GetInvalidGivers()
        {
            yield return new object[] { new PostGiverDto() }; //Missing members
            yield return new object[] { new PostGiverDto() { Location = "Stavanger", FullName = "Test Testesen", Email = "Test@Testesen.com", PhoneNumber = "12345678", MaxReceivers = 0 } }; //Invalid MaxRecivers
            yield return new object[] { new PostGiverDto() { Location = "Stavanger", FullName = "", Email = "Test@Testesen.com", PhoneNumber = "12345678", MaxReceivers = 5 } }; //Invalid Name
            yield return new object[] { new PostGiverDto() { Location = "Stavanger", FullName = "Test Testesen", Email = "Invalid Mail", PhoneNumber = "12345678", MaxReceivers = 5 } }; //Invalid Mail
            yield return new object[] { new PostGiverDto() { Location = "Stavanger", FullName = "Test Testesen", Email = "Test@Testesen.com", PhoneNumber = "Invalid ", MaxReceivers = 5 } }; //Invalid PhoneNumber
            yield return new object[] { new PostGiverDto() { Location = "", FullName = "Test Testesen", Email = "Test@Testesen.com", PhoneNumber = "Invalid ", MaxReceivers = 5 } }; //Invalid Location
        }

        [Theory]
        [MemberData(nameof(GetInvalidGivers))]
        public void ValidateInvalidGiverModels(PostGiverDto model)
        {
            Assert.NotEmpty(Validator.ValidateModel(model));
        }

        [Fact]
        public void ValidateValidGiverModel()
        {
            Assert.Empty(Validator.ValidateModel(new PostGiverDto() { Location = "Stavanger", FullName = "Test Testesen", Email = "Test@Testesen.com", PhoneNumber = "12345678", MaxReceivers = 1 }));
        }
    }
}
