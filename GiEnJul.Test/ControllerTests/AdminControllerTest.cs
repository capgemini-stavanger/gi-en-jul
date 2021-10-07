using GiEnJul.Clients;
using GiEnJul.Controllers;
using GiEnJul.Infrastructure;
using GiEnJul.Models;
using GiEnJul.Repositories;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace GiEnJul.Test.ControllerTests
{
    public class AdminControllerTest : BaseControllerTest
    {
        private Mock<IEventRepository> mockEventRepo { get; set; }
        public Mock<IGiverRepository> mockGiverRepo { get; private set; }
        public Mock<IRecipientRepository> mockRecipientRepo { get; private set; }
        public Mock<IPersonRepository> mockPersonRepo { get; private set; }
        public Mock<IConnectionRepository> mockConnectionRepo { get; private set; }

        private readonly Mock<IEmailClient> emailClientMock;

        public Mock<IConfiguration> configMock { get; private set; }
        public readonly Settings settings;

        private AdminController _controller;

        public AdminControllerTest()
        {
            mockEventRepo = new Mock<IEventRepository>();
            mockGiverRepo = new Mock<IGiverRepository>();
            mockRecipientRepo = new Mock<IRecipientRepository>();
            mockPersonRepo = new Mock<IPersonRepository>();
            mockConnectionRepo = new Mock<IConnectionRepository>();
            emailClientMock = new Mock<IEmailClient>();
            configMock = new Mock<IConfiguration>();
            settings = new Settings(configMock.Object);
            _controller = new AdminController(mockEventRepo.Object,
                                              mockGiverRepo.Object,
                                              mockRecipientRepo.Object,
                                              mockPersonRepo.Object,
                                              mockConnectionRepo.Object,
                                              _log,
                                              _mapper,
                                              emailClientMock.Object,
                                              settings);
        }

        public void Dispose()
        {
            mockEventRepo.VerifyNoOtherCalls();
            mockGiverRepo.VerifyNoOtherCalls();
            mockRecipientRepo.VerifyNoOtherCalls();
            mockPersonRepo.VerifyNoOtherCalls();
            mockConnectionRepo.VerifyNoOtherCalls();

            emailClientMock.VerifyNoOtherCalls();
        }

        [Fact]
        public async Task GetUnsuggestedGivers_ListContainsAllMaxRecipientTypes()
        {
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync("Stavanger")).ReturnsAsync("event");
            mockGiverRepo.Setup(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(CreateGiverList());

            var list = await _controller.GetUnsuggestedGiversAsync("Stavanger");

            Assert.Equal(3, list.Count);

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync("Stavanger"), Times.Once());
            mockGiverRepo.Verify(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()), Times.Once);
        }

        [Fact]
        public async Task GetUnsuggestedGivers_ListContainsTwoMaxRecipientTypes()
        {
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync("Stavanger")).ReturnsAsync("event");
            mockGiverRepo.Setup(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(CreateGiverList(false));

            var list = await _controller.GetUnsuggestedGiversAsync("Stavanger");

            Assert.Equal(2, list.Count);

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync("Stavanger"), Times.Once());
            mockGiverRepo.Verify(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()), Times.Once);
        }

        [Fact]
        public async Task GetUnsuggestedGivers_ListIsEmpty()
        {
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync("Stavanger")).ReturnsAsync("event");
            mockGiverRepo.Setup(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(new List<Giver>());

            var list = await _controller.GetUnsuggestedGiversAsync("Stavanger");

            Assert.Equal(0, list.Count);

            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync("Stavanger"), Times.Once());
            mockGiverRepo.Verify(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()), Times.Once);
        }

        public List<Giver> CreateGiverList(bool oneOfEach = true, string location = "Stavanger")
        {
            var list = new List<Giver>();
            list.Add(new Giver { IsSuggestedMatch = false, Email = "Uno@one.com", Location = location, MaxReceivers = 2 });
            list.Add(new Giver { IsSuggestedMatch = false, Email = "Dos@two.com", Location = location, MaxReceivers = 5 });
            list.Add(new Giver { IsSuggestedMatch = false, Email = "Tre@tre.com", Location = location, MaxReceivers = 5 });
            if (oneOfEach)
            {
                list.Add(new Giver { IsSuggestedMatch = false, Email = "first@one.com", Location = location, MaxReceivers = 2 });
                list.Add(new Giver { IsSuggestedMatch = false, Email = "Secon@two.com", Location = location, MaxReceivers = 5 });
                list.Add(new Giver { IsSuggestedMatch = false, Email = "third@thr.com", Location = location, MaxReceivers = 100 });
            }
            return list;
        }
    }
}
