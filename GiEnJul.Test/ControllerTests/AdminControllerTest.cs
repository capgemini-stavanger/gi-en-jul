using GiEnJul.Clients;
using GiEnJul.Controllers;
using GiEnJul.Infrastructure;
using GiEnJul.Models;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace GiEnJul.Test.ControllerTests
{
    public class AdminControllerTest : BaseControllerTest
    {
        private Mock<IEventRepository> MockEventRepo { get; set; }
        public Mock<IGiverRepository> MockGiverRepo { get; private set; }
        public Mock<IRecipientRepository> MockRecipientRepo { get; private set; }
        public Mock<IPersonRepository> MockPersonRepo { get; private set; }
        public Mock<IConnectionRepository> MockConnectionRepo { get; private set; }

        private readonly Mock<IEmailClient> emailClientMock;

        public Mock<IConfiguration> ConfigMock { get; private set; }
        public Mock<IEmailTemplateBuilder> mockEmailTemplateBuilder { get; set; }

        public readonly Settings settings;

        private AdminController _controller;

        public AdminControllerTest()
        {
            MockEventRepo = new Mock<IEventRepository>();
            MockGiverRepo = new Mock<IGiverRepository>();
            MockRecipientRepo = new Mock<IRecipientRepository>();
            MockPersonRepo = new Mock<IPersonRepository>();
            MockConnectionRepo = new Mock<IConnectionRepository>();
            emailClientMock = new Mock<IEmailClient>();
            ConfigMock = new Mock<IConfiguration>();
            mockEmailTemplateBuilder = new Mock<IEmailTemplateBuilder>();
            settings = new Settings(ConfigMock.Object);
            _controller = new AdminController(MockEventRepo.Object,
                                              MockGiverRepo.Object,
                                              MockRecipientRepo.Object,
                                              MockPersonRepo.Object,
                                              MockConnectionRepo.Object,
                                              _log,
                                              _mapper,
                                              emailClientMock.Object,
                                              settings,
                                              mockEmailTemplateBuilder.Object);
        }

        [Fact]
        public void Dispose()
        {
            MockEventRepo.VerifyNoOtherCalls();
            MockGiverRepo.VerifyNoOtherCalls();
            MockRecipientRepo.VerifyNoOtherCalls();
            MockPersonRepo.VerifyNoOtherCalls();
            MockConnectionRepo.VerifyNoOtherCalls();

            emailClientMock.VerifyNoOtherCalls();
            mockEmailTemplateBuilder.VerifyNoOtherCalls();
        }

        [Fact]
        public async Task GetUnsuggestedGivers_ListContainsAllMaxRecipientTypes()
        {
            MockEventRepo.Setup(x => x.GetActiveEventForLocationAsync("Stavanger")).ReturnsAsync("event");
            MockGiverRepo.Setup(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(CreateGiverList());

            var list = await _controller.GetUnsuggestedGiversAsync("Stavanger");

            Assert.Equal(3, list.Count);

            MockEventRepo.Verify(x => x.GetActiveEventForLocationAsync("Stavanger"), Times.Once());
            MockGiverRepo.Verify(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()), Times.Once);
        }

        [Fact]
        public async Task GetUnsuggestedGivers_ListContainsTwoMaxRecipientTypes()
        {
            MockEventRepo.Setup(x => x.GetActiveEventForLocationAsync("Stavanger")).ReturnsAsync("event");
            MockGiverRepo.Setup(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(CreateGiverList(false));

            var list = await _controller.GetUnsuggestedGiversAsync("Stavanger");

            Assert.Equal(2, list.Count);

            MockEventRepo.Verify(x => x.GetActiveEventForLocationAsync("Stavanger"), Times.Once());
            MockGiverRepo.Verify(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()), Times.Once);
        }

        [Fact]
        public async Task GetUnsuggestedGivers_ListIsEmpty()
        {
            MockEventRepo.Setup(x => x.GetActiveEventForLocationAsync("Stavanger")).ReturnsAsync("event");
            MockGiverRepo.Setup(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(new List<Giver>());

            var list = await _controller.GetUnsuggestedGiversAsync("Stavanger");

            Assert.Equal(0, list.Count);

            MockEventRepo.Verify(x => x.GetActiveEventForLocationAsync("Stavanger"), Times.Once());
            MockGiverRepo.Verify(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()), Times.Once);
        }

        [Fact]
        public async Task GetUnsuggestedGivers_ListIsInOrder()
        {
            MockEventRepo.Setup(x => x.GetActiveEventForLocationAsync("Stavanger")).ReturnsAsync("event");
            MockGiverRepo.Setup(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()))
                .ReturnsAsync(CreateGiverList());

            var list = await _controller.GetUnsuggestedGiversAsync("Stavanger");

            Assert.True(list.First().MaxReceivers < list.Skip(1).First().MaxReceivers);
            Assert.True(list.Skip(1).First().MaxReceivers < list.Skip(2).First().MaxReceivers);

            MockEventRepo.Verify(x => x.GetActiveEventForLocationAsync("Stavanger"), Times.Once());
            MockGiverRepo.Verify(x => x.GetUnsuggestedAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<int>()), Times.Once);
        }

        public List<Giver> CreateGiverList(bool oneOfEach = true, string location = "Stavanger")
        {
            var list = new List<Giver>();
            list.Add(new Giver { IsSuggestedMatch = false, Email = "Tre@tre.com", Location = location, MaxReceivers = 5 });
            list.Add(new Giver { IsSuggestedMatch = false, Email = "Uno@one.com", Location = location, MaxReceivers = 2 });
            list.Add(new Giver { IsSuggestedMatch = false, Email = "Dos@two.com", Location = location, MaxReceivers = 5 });
            if (oneOfEach)
            {
                list.Add(new Giver { IsSuggestedMatch = false, Email = "third@thr.com", Location = location, MaxReceivers = 100 });
                list.Add(new Giver { IsSuggestedMatch = false, Email = "first@one.com", Location = location, MaxReceivers = 2 });
                list.Add(new Giver { IsSuggestedMatch = false, Email = "Secon@two.com", Location = location, MaxReceivers = 5 });
            }
            return list;
        }
    }
}
