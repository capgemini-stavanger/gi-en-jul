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