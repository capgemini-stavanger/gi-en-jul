using GiEnJul.Clients;
using GiEnJul.Controllers;
using GiEnJul.Dtos;
using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace GiEnJul.Test.ControllerTests
{
    public class GiverControllerTest : BaseControllerTest, IDisposable
    {
        private Mock<IGiverRepository> mockGiverRepo { get; set; }
        private Mock<IEventRepository> mockEventRepo { get; set; }
        private Mock<IEmailClient> mockEmailClient { get; set; }
        private GiverController _controller;


        //Run before each test
        public GiverControllerTest()
        {
            mockGiverRepo = new Mock<IGiverRepository>();
            mockEventRepo = new Mock<IEventRepository>();
            mockEmailClient = new Mock<IEmailClient>();
            _controller = new GiverController(mockGiverRepo.Object, mockEventRepo.Object, mockEmailClient.Object, _log, _mapper);
        }

        //Runs after each test
        public void Dispose()
        {
            mockEventRepo.VerifyNoOtherCalls();
            mockGiverRepo.VerifyNoOtherCalls();
            mockEmailClient.VerifyNoOtherCalls();
        }

        [Fact]
        public async Task PostAsync_EventRepositoryThrowsArgumentException_ControllerReturnsBadRequest()
        {
            //Arrange
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).Throws(new ArgumentException());

            //Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _controller.PostAsync(new PostGiverDto()));

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_EventRepositoryThrowsKeyNotFoundException_ControllerReturnsBadRequest()
        {
            //Arrange
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).Throws(new KeyNotFoundException());

            //Act & Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _controller.PostAsync(new PostGiverDto() { Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" }));

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
        }


        [Fact]
        public async Task PostAsync_EventRepositoryThrowsException_ControllerReturnsBadRequest()
        {
            //Arrange
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).Throws(new Exception());

            //Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new PostGiverDto() { Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" }));

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_GiverRepositoryThrowsException_ControllerReturnsBadRequest()
        {
            //Arrange
            var fakeEvent = new Entities.Event { RowKey = "Stavanger", PartitionKey = "Jul21", DeliveryAdress = "Somewhere", EndDate = DateTime.UtcNow, StartDate = DateTime.UtcNow };
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).ReturnsAsync(fakeEvent.PartitionKey);
            mockGiverRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>())).Throws(new Exception());

            //Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new PostGiverDto() { Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" }));

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
            mockGiverRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_GiverRepositorySuccessfullyAddsEntity_ControllerReturnsEntityAsync()
        {
            //Arrange
            var fakeEvent = new Entities.Event { RowKey = "Stavanger", PartitionKey = "Jul21", DeliveryAdress = "Somewhere", EndDate = DateTime.UtcNow, StartDate = DateTime.UtcNow };
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).ReturnsAsync(fakeEvent.PartitionKey);

            var fakeModel = new Models.Giver { RowKey = Guid.NewGuid().ToString(), PartitionKey = $"{fakeEvent.RowKey}_{fakeEvent.PartitionKey}", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" };
            mockGiverRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>())).ReturnsAsync(fakeModel);

            //Act
            var result = await _controller.PostAsync(new PostGiverDto() { Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" });

            //Assert
            var actionResult = Assert.IsType<ActionResult<PostGiverResultDto>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<PostGiverResultDto>(createdAtActionResult.Value);
            Assert.Equal((fakeModel.FullName, fakeModel.Email), (returnValue.FullName, returnValue.Email));

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
            mockGiverRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>()), Times.Once());
            mockEmailClient.Verify(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        }
    }
}