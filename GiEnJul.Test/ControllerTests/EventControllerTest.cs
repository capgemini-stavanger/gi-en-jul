using GiEnJul.Controllers;
using GiEnJul.Features;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace GiEnJul.Test.ControllerTests
{
    public class EventControllerTest : BaseControllerTest, IDisposable
    {
        private Mock<IEventRepository> mockEventRepo { get; set; }
        private EventController _controller;

        public EventControllerTest()
        {
            mockEventRepo = new Mock<IEventRepository>();
            _controller = new EventController(mockEventRepo.Object, _log, _mapper);
        }

        public void Dispose()
        {
            mockEventRepo.VerifyNoOtherCalls();
        }

        [Fact]
        public async Task GetActiveLocationsAsync_RepositorySucessfullyReturnsList_ControllerReturnsLocationList()
        {
            var locationList = new[] { "Stavanger", "Sandnes" };
            mockEventRepo.Setup(x => x.GetLocationsWithActiveEventAsync()).ReturnsAsync(locationList);

            var result = await _controller.GetActiveLocationsAsync();

            var returnValue = Assert.IsType<string[]>(result);
            Assert.Equal(locationList, returnValue);

            mockEventRepo.Verify(x => x.GetLocationsWithActiveEventAsync(), Times.Once());
        }

        [Fact]
        public async Task GetActiveLocationsAsync_RepositoryThrowsException_ControllerThrowsException()
        {
            mockEventRepo.Setup(x => x.GetLocationsWithActiveEventAsync()).ThrowsAsync(new Exception());

            await Assert.ThrowsAsync<Exception>(() => _controller.GetActiveLocationsAsync());

            mockEventRepo.Verify(x => x.GetLocationsWithActiveEventAsync(), Times.Once());
        }
    }
}
