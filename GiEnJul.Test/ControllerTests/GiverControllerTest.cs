using GiEnJul.Clients;
using GiEnJul.Controllers;
using GiEnJul.Dtos;
using GiEnJul.Infrastructure;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
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
        private Mock<ISettings> mockSettings { get; set; }
        private Mock<IRecaptchaVerifier> mockRecaptchaVerifier { get; set; }
        private GiverController _controller;


        //Run before each test
        public GiverControllerTest()
        {
            mockGiverRepo = new Mock<IGiverRepository>();
            mockEventRepo = new Mock<IEventRepository>();
            mockEmailClient = new Mock<IEmailClient>();
            mockSettings = new Mock<ISettings>();
            mockRecaptchaVerifier = new Mock<IRecaptchaVerifier>();
            _controller = new GiverController(mockGiverRepo.Object, mockEventRepo.Object, mockEmailClient.Object, _log, _mapper, mockRecaptchaVerifier.Object);

            mockRecaptchaVerifier.Setup(x => x.VerifyAsync(It.IsAny<string>())).ReturnsAsync(new GetRecaptchaDto() { Success = true });
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
            mockEventRepo.Setup(x => x.GetEventByUserLocationAsync(It.IsAny<string>())).Throws(new ArgumentException());

            //Act & Assert
            await Assert.ThrowsAsync<ArgumentException>(() => _controller.PostAsync(new PostGiverDto()));

            mockEventRepo.Verify(x => x.GetEventByUserLocationAsync(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_EventRepositoryThrowsKeyNotFoundException_ControllerReturnsBadRequest()
        {
            //Arrange
            mockEventRepo.Setup(x => x.GetEventByUserLocationAsync(It.IsAny<string>())).Throws(new KeyNotFoundException());

            //Act & Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => _controller.PostAsync(new PostGiverDto() { RecaptchaToken = "abcdefg123456", Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" }));

            mockEventRepo.Verify(x => x.GetEventByUserLocationAsync(It.IsAny<string>()), Times.Once());
        }


        [Fact]
        public async Task PostAsync_EventRepositoryThrowsException_ControllerReturnsBadRequest()
        {
            //Arrange
            mockEventRepo.Setup(x => x.GetEventByUserLocationAsync(It.IsAny<string>())).Throws(new Exception());

            //Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new PostGiverDto() { RecaptchaToken = "abcdefg123456", Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" }));

            mockEventRepo.Verify(x => x.GetEventByUserLocationAsync(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_GiverRepositoryThrowsException_ControllerReturnsBadRequest()
        {
            //Arrange
            var fakeEvent = new Models.Event { RowKey = "Stavanger", PartitionKey = "Jul21", DeliveryAddress = "Somewhere", EndDate = DateTime.UtcNow, StartDate = DateTime.UtcNow, GiverLimit=40 };
            mockEventRepo.Setup(x => x.GetEventByUserLocationAsync(It.IsAny<string>())).ReturnsAsync(fakeEvent);
            mockGiverRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>())).Throws(new Exception());

            //Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new PostGiverDto() { RecaptchaToken = "abcdefg123456", Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" }));

            mockEventRepo.Verify(x => x.GetEventByUserLocationAsync(It.IsAny<string>()), Times.Once());
            mockGiverRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>()), Times.Once());

        }

        [Fact]
        public async Task PostAsync_GiverRepositorySuccessfullyAddsEntity_ControllerReturnsEntityAsync()
        {
            //Arrange
            var fakeEvent = new Models.Event { RowKey = "Stavanger", PartitionKey = "Jul21", DeliveryAddress = "Somewhere", EndDate = DateTime.UtcNow, StartDate = DateTime.UtcNow, GiverLimit = 40 };
            mockEventRepo.Setup(x => x.GetEventByUserLocationAsync(It.IsAny<string>())).ReturnsAsync(fakeEvent);

            var fakeModel = new Models.Giver { RowKey = Guid.NewGuid().ToString(), PartitionKey = $"{fakeEvent.RowKey}_{fakeEvent.PartitionKey}", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" };
            mockGiverRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>())).ReturnsAsync(fakeModel);

            //Act
            var result = await _controller.PostAsync(new PostGiverDto() { RecaptchaToken = "abcdefg123456", Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" });

            //Assert
            var actionResult = Assert.IsType<ActionResult<PostGiverResultDto>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<PostGiverResultDto>(createdAtActionResult.Value);
            Assert.Equal((fakeModel.FullName, fakeModel.Email), (returnValue.FullName, returnValue.Email));

            mockGiverRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>()), Times.Once());
            mockEmailClient.Verify(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Once());
            mockEventRepo.Verify(x => x.GetEventByUserLocationAsync(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_GiverRepositoryThrowsException_RecaptchaReturnsUnsuccessful()
        {
            //Arrange
            var token = "abcdefg123456";
            mockRecaptchaVerifier.Setup(x => x.VerifyAsync(It.IsAny<string>())).ReturnsAsync(new GetRecaptchaDto() { Success = false });

            //Act & Assert
            var result = await _controller.PostAsync(new PostGiverDto() { RecaptchaToken = token, Location = "Not Empty", MaxReceivers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" });
            Assert.IsType<ForbidResult>(result.Result);

            mockRecaptchaVerifier.Verify(x => x.VerifyAsync(token), Times.Once());
        }
    }
}