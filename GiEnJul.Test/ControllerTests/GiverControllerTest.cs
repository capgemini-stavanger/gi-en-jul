using AutoMapper;
using GiEnJul.Dtos;
using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Serilog;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace GiEnJul.Controllers.Tests
{
    public class GiverControllerTest : IDisposable
    {
        private Mock<IGiverRepository> mockGiverRepo { get; set; }
        private Mock<IEventRepository> mockEventRepo { get; set; }
        private Mock<ILogger> mockLog;
        private Mock<IMapper> mockMapper;
        private GiverController _controller;

        //Run before each test
        public GiverControllerTest()
        {
            mockGiverRepo = new Mock<IGiverRepository>();
            mockEventRepo = new Mock<IEventRepository>();
            mockLog = new Mock<ILogger>();
            mockMapper = new Mock<IMapper>();
            _controller = new GiverController(mockGiverRepo.Object, mockEventRepo.Object, mockLog.Object, mockMapper.Object);
        }

        //Run after each test
        public void Dispose()
        {
            mockEventRepo.VerifyNoOtherCalls();
            mockGiverRepo.VerifyNoOtherCalls();
        }

        [Fact]
        public async Task PostAsync_EventRepositoryThrowsArgumentException_ControllerReturnsBadRequest()
        {
            //Arrange
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).Throws(new ArgumentException());

            //Act
            var result = await _controller.PostAsync(new PostGiverDto());

            //Assert
            var actionResult = Assert.IsType<ActionResult<Entities.Giver>>(result);
            Assert.IsType<BadRequestObjectResult>(actionResult.Result);


            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_EventRepositoryThrowsKeyNotFoundException_ControllerReturnsBadRequest()
        {
            //Arrange
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).Throws(new KeyNotFoundException());

            //Act
            var result = await _controller.PostAsync(new PostGiverDto() { Location = "Not empty" });

            //Assert
            var actionResult = Assert.IsType<ActionResult<Entities.Giver>>(result);
            var createdAtActionResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result);

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
        }


        [Fact]
        public async Task PostAsync_EventRepositoryThrowsException_ControllerReturnsBadRequest()
        {
            //Arrange
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).Throws(new Exception());

            //Act
            var result = await _controller.PostAsync(new PostGiverDto() { Location = "Not empty" });

            //Assert
            var actionResult = Assert.IsType<ActionResult<Entities.Giver>>(result);
            var statusCodeResult = Assert.IsType<ObjectResult>(actionResult.Result);
            Assert.Equal(500, statusCodeResult.StatusCode);

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_GiverRepositoryThrowsError_ControllerReturnsBadRequest()
        {
            //Arrange
            var fakeEvent = new Entities.Event { RowKey = "Stavanger", PartitionKey = "Jul21", DeliveryAdress = "Somewhere", EndDate = DateTime.Parse("12/24/2021"), StartDate = DateTime.UtcNow };
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).ReturnsAsync(fakeEvent.PartitionKey);
            mockGiverRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>())).Throws(new Exception());

            //Act
            var result = await _controller.PostAsync(new PostGiverDto() { Location = "Not empty" });

            //Assert
            var actionResult = Assert.IsType<ActionResult<Entities.Giver>>(result);
            var statusCodeResult = Assert.IsType<ObjectResult>(actionResult.Result);
            Assert.Equal(500, statusCodeResult.StatusCode);

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
            mockGiverRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_GiverRepositorySuccessfullyAddsEntity_ControllerReturnsEntityAsync()
        {
            //Arrange
            var fakeEvent = new Entities.Event { RowKey = "Stavanger", PartitionKey = "Jul21", DeliveryAdress = "Somewhere", EndDate = DateTime.Parse("12/24/2021"), StartDate = DateTime.UtcNow };
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).ReturnsAsync(fakeEvent.PartitionKey);

            var entity = new Entities.Giver(fakeEvent.RowKey, fakeEvent.PartitionKey) { MaxRecievers = 5, PhoneNumber = "12312312", FullName = "FullName", Email = "Email" };
            mockGiverRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>())).ReturnsAsync(entity);

            //Act
            var result = await _controller.PostAsync(new PostGiverDto() { Location = "Not Empty" });

            //Assert
            var actionResult = Assert.IsType<ActionResult<Entities.Giver>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<Entities.Giver>(createdAtActionResult.Value);
            Assert.Equal((entity.RowKey, entity.PartitionKey), (returnValue.RowKey, returnValue.PartitionKey));

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
            mockGiverRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Giver>()), Times.Once());
            

        
        }
    }
}