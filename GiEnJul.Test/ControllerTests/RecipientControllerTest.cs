using GiEnJul.Controllers;
using GiEnJul.Dtos;
using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Table;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace GiEnJul.Test.ControllerTests
{
    public class RecipientControllerTest : BaseControllerTest, IDisposable
    {
        private Mock<IRecipientRepository> mockRecipientRepo { get; set; }
        private Mock<IPersonRepository> mockPersonRepo { get; set; }
        private Mock<IEventRepository> mockEventRepo { get; set; }
        private RecipientController _controller;

        //Run before each test
        public RecipientControllerTest()
        {
            mockRecipientRepo = new Mock<IRecipientRepository>();
            mockPersonRepo = new Mock<IPersonRepository>();
            mockEventRepo = new Mock<IEventRepository>();
            _controller = new RecipientController(mockRecipientRepo.Object, mockPersonRepo.Object, mockEventRepo.Object, _log, _mapper);
        }

        //Runs after each test
        public void Dispose()
        {
            mockEventRepo.VerifyNoOtherCalls();
            mockPersonRepo.VerifyNoOtherCalls();
            mockRecipientRepo.VerifyNoOtherCalls();
        }

        public Models.Recipient ArrangeOkRecipientRepositoryInsertResult()
        {
            var recipient = new Models.Recipient()
            {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                EventName = "Jul21",
                Location = "Stavanger",
                PartitionKey = "Jul21_Stavanger",
                RowKey = Guid.NewGuid().ToString()
            };
            mockRecipientRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>())).ReturnsAsync(recipient);
            return recipient;
        }

        public TableBatchResult ArrangeOkPeopleRepositoryInsertResult()
        {
            var people = new List<Entities.Person>
            {
                new Entities.Person("recipientid") { Wish = "leke", Age = 4, Gender = 2 },
                new Entities.Person("recipientid") { Age = 47, Gender = 1 },
                new Entities.Person("recipientid") { Wish = "sko", Age = 6, Gender = 2 }
            };
            var peopleTableBatchResult = new TableBatchResult();
            people.ForEach(p => peopleTableBatchResult.Add(new TableResult { Result = p }));

            mockPersonRepo.Setup(x => x.InsertOrReplaceBatchAsync(It.IsAny<IEnumerable<Models.Person>>())).ReturnsAsync(peopleTableBatchResult);
            return peopleTableBatchResult;
        }

        [Fact]
        public async Task PostAsync_EventRepositoryThrowsError_ControllerThrowsErrorAsync()
        {
            // Arrange
            ArrangeOkPeopleRepositoryInsertResult();
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).Throws(new Exception());

            // Action & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new PostRecipientDto { ContactEmail = "mail@mail.no", ContactFullName = "con nam", ContactPhoneNumber = "90909090", Dessert = "dessert", Dinner = "dinner", Institution = "nav", Location = "Stavanger", Note = "", ReferenceId = "123", FamilyMembers = { new PostPersonDto { Age = 44, Gender = Models.Gender.Female, Wish = "wish" } } }));
            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
        }


        [Fact]
        public async Task PostAsync_RecipientRepositoryThrowsError_ControllerThrowsErrorAsync()
        {
            // Arrange
            ArrangeOkPeopleRepositoryInsertResult();
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).ReturnsAsync("Jul21");
            mockRecipientRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>())).Throws(new Exception("An error"));

            // Action & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new PostRecipientDto { ContactEmail = "mail@mail.no", ContactFullName = "con nam", ContactPhoneNumber = "90909090", Dessert = "dessert", Dinner = "dinner", Institution = "nav", Location = "Stavanger", Note = "", ReferenceId = "123", FamilyMembers = { new PostPersonDto { Age = 44, Gender = Models.Gender.Female, Wish = "wish" } } }));
            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
            mockRecipientRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_PersonRepositoryThrowsError_ControllerThrowsErrorAsync()
        {
            // Arrange
            ArrangeOkRecipientRepositoryInsertResult();
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).ReturnsAsync("Jul21");
            mockRecipientRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>())).ReturnsAsync(new Models.Recipient());
            mockPersonRepo.Setup(x => x.InsertOrReplaceBatchAsync(It.IsAny<IEnumerable<Models.Person>>())).Throws(new Exception("An error"));
            mockRecipientRepo.Setup(x => x.DeleteAsync(It.IsAny<Models.Recipient>())).ReturnsAsync(new Models.Recipient());

            // Action & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new PostRecipientDto { ContactEmail = "mail@mail.no", ContactFullName = "con nam", ContactPhoneNumber = "90909090", Dessert = "dessert", Dinner = "dinner", Institution = "nav", Location = "Stavanger", Note = "", ReferenceId = "123", FamilyMembers = { new PostPersonDto { Age = 44, Gender = Models.Gender.Female, Wish = "wish" } } }));
            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
            mockRecipientRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>()), Times.Once());
            mockPersonRepo.Verify(x => x.InsertOrReplaceBatchAsync(It.IsAny<IEnumerable<Models.Person>>()), Times.Once());
            mockRecipientRepo.Verify(x => x.DeleteAsync(It.IsAny<Models.Recipient>()), Times.Once());
        }

        [Fact]
        public async Task PostAsync_RepositorySuccessfullyAddsEntity_ControllerReturnsEntityAsync()
        {
            // Arrange
            var recipient = ArrangeOkRecipientRepositoryInsertResult();
            ArrangeOkPeopleRepositoryInsertResult();
            mockEventRepo.Setup(x => x.GetActiveEventForLocationAsync(It.IsAny<string>())).ReturnsAsync("Jul21");

            // Act
            var result = await _controller.PostAsync(new PostRecipientDto { ContactEmail = "mail@mail.no", ContactFullName = "con nam", ContactPhoneNumber = "90909090", Dessert = "dessert", Dinner = "dinner", Institution = "nav", Location = "Stavanger", Note = "", ReferenceId = "123", FamilyMembers = { new PostPersonDto { Age = 44, Gender = Models.Gender.Female, Wish = "wish" } } });

            //Assert
            Assert.IsType<OkResult>(result);
            mockRecipientRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>()), Times.Once());
            mockPersonRepo.Verify(x => x.InsertOrReplaceBatchAsync(It.IsAny<IEnumerable<Models.Person>>()), Times.Once());
            mockEventRepo.Verify(x => x.GetActiveEventForLocationAsync(It.IsAny<string>()), Times.Once());
        }
    }
}