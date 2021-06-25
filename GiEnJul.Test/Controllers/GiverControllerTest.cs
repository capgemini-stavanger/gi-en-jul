using GiEnJul.Features;
using GiEnJul.Test;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Serilog;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Xunit;

namespace GiEnJul.Controllers.Tests
{
    public class GiverControllerTest
    {
        private Mock<IGiverRepository> mockGiverRepo { get; set; }
        private Mock<ILogger> mockLog;
        private GiverController _controller;


        public GiverControllerTest()
        {
            mockGiverRepo = new Mock<IGiverRepository>();
            mockLog = new Mock<ILogger>();
            _controller = new GiverController(mockGiverRepo.Object, mockLog.Object);
        }


        /// <summary>
        /// Validate model using DataAnnotations such as [Required] etc.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>List of ValidationErrors or empty list</returns>
        private IList<ValidationResult> ValidateModel(object model)
        {
            var validationResults = new List<ValidationResult>();
            var ctx = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, ctx, validationResults, true);
            return validationResults;
        }

        public static IEnumerable<object[]> GetInvalidGivers()
        {
            yield return new object[] { new Models.Giver("Location") }; //Missing members
            yield return new object[] { new Models.Giver("Stavanger") { FullName = "Test Testesen", Email = "Test@Testesen.com",    PhoneNumber = "12345678", MaxRecievers = 0 } }; //Invalid MaxRecivers
            yield return new object[] { new Models.Giver("Stavanger") { FullName = "",              Email = "Test@Testesen.com",    PhoneNumber = "12345678", MaxRecievers = 5 } }; //Invalid Name
            yield return new object[] { new Models.Giver("Stavanger") { FullName = "Test Testesen", Email = "Invalid Mail",         PhoneNumber = "12345678", MaxRecievers = 5 } }; //Invalid Mail
            yield return new object[] { new Models.Giver("Stavanger") { FullName = "Test Testesen", Email = "Test@Testesen.com",    PhoneNumber = "Invalid ", MaxRecievers = 5 } }; //Invalid PhoneNumber
        }

        [Theory]
        [MemberData(nameof(GetInvalidGivers))]
        public void ValidateInvalidGiverModels(Models.Giver model)
        {
            Assert.NotEmpty(ValidateModel(model));
        }

        [Fact]
        public void ValidateValidGiverModel()
        {
            Assert.Empty(ValidateModel(new Models.Giver("Stavanger") { FullName = "Test Testesen", Email = "Test@Testesen.com", PhoneNumber = "12345678", MaxRecievers = 1 }));
        }

        [Fact]
        public async Task PostAsync_RepositoryThrowsError_ControllerThrowsErrorAsync()
        {
            //Arrange
            mockGiverRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>())).Throws(new Exception("An error"));

            //Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new Models.Giver("Test")));
        }


        [Fact]
        public async Task PostAsync_RepositorySuccessfullyAddsEntity_ControllerReturnsEntityAsync()
        {
            //Arrange
            var entity = new Entities.Giver("zzz") { RowKey = "RowKey", MaxRecievers = 5, PhoneNumber = 12312312, FullName = "FullName", Email = "Email" };
            mockGiverRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>())).ReturnsAsync(entity);

            //Act
            var result = await _controller.PostAsync(new Models.Giver("Test"));

            //Assert
            var actionResult = Assert.IsType<ActionResult<Entities.Giver>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<Entities.Giver>(createdAtActionResult.Value);

            mockGiverRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>()), Times.Once());

            Assert.Equal((entity.RowKey, entity.PartitionKey), (returnValue.RowKey, returnValue.PartitionKey));
        }
    }
}