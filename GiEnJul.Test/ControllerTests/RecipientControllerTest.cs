using GiEnJul.Controllers;
using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Table;
using Moq;
using Serilog;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace GiEnJul.Test.ControllerTests
{
    public class RecipientControllerTest
    {
        private Mock<IRecipientRepository> mockRecipientRepo { get; set; }
        private Mock<IPersonRepository> mockPersonRepo { get; set; }
        private Mock<ILogger> mockLog;
        private RecipientController _controller;

        public RecipientControllerTest()
        {
            mockRecipientRepo = new Mock<IRecipientRepository>();
            mockPersonRepo = new Mock<IPersonRepository>();
            mockLog = new Mock<ILogger>();
            _controller = new RecipientController(mockRecipientRepo.Object, mockPersonRepo.Object, mockLog.Object);
        }

        public Entities.Recipient ArrangeOkRecipientRepositoryInsertResult()
        {
            var recipient = new Entities.Recipient("Stavanger", "qwerty")
            {
                ContactEmail = "o@v.no",
                ContactFullName = "daniel",
                ContactPhoneNumber = "99944999",
                Institution = "NAV",
                ReferenceId = "2",
                Dinner = "pinnekjøtt",
                Dessert = "sjokoladepudding",
                Note = "",
                Event = "JUL2021",
                PersonCount = 3
            };
            mockRecipientRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>())).ReturnsAsync(recipient);
            return recipient;
        }

        public TableBatchResult ArrangeOkPeopleRepositoryInsertResult()
        {
            var people = new List<Entities.Person>
            {
                new Entities.Person("qwerty", "abc123") { Wish = "leke", Age = 4, Gender = 2 },
                new Entities.Person("qwerty", "def456") { Age = 47, Gender = 1 },
                new Entities.Person("qwerty", "ghj789") { Wish = "sko", Age = 6, Gender = 2 }
            };
            var peopleTableBatchResult = new TableBatchResult();
            people.ForEach(p => peopleTableBatchResult.Add(new TableResult { Result = p }));

            mockPersonRepo.Setup(x => x.InsertOrReplaceBatchAsync(It.IsAny<IEnumerable<Models.Person>>())).ReturnsAsync(peopleTableBatchResult);
            return peopleTableBatchResult;
        }

        [Fact]
        public async Task PostAsync_RecipientRepositoryThrowsError_ControllerThrowsErrorAsync()
        {
            // Arrange
            ArrangeOkPeopleRepositoryInsertResult();
            mockRecipientRepo.Setup(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>())).Throws(new Exception("An error"));

            // Action & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new Models.Recipient("Test")));
        }

        [Fact]
        public async Task PostAsync_PersonRepositoryThrowsError_ControllerThrowsErrorAsync()
        {
            // Arrange
            ArrangeOkRecipientRepositoryInsertResult();
            mockPersonRepo.Setup(x => x.InsertOrReplaceBatchAsync(It.IsAny<IEnumerable<Models.Person>>())).Throws(new Exception("An error"));

            // Action & Assert
            await Assert.ThrowsAsync<Exception>(() => _controller.PostAsync(new Models.Recipient("Test")));
        }

        [Fact]
        public async Task PostAsync_RepositorySuccessfullyAddsEntity_ControllerReturnsEntityAsync()
        {
            // Arrange
            var recipient = ArrangeOkRecipientRepositoryInsertResult();
            ArrangeOkPeopleRepositoryInsertResult();

            // Act
            var result = await _controller.PostAsync(new Models.Recipient("Test"));

            //Assert
            var actionResult = Assert.IsType<ActionResult<Entities.Recipient>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var returnValue = Assert.IsType<Entities.Recipient>(createdAtActionResult.Value);

            mockRecipientRepo.Verify(x => x.InsertOrReplaceAsync(It.IsAny<Models.Recipient>()), Times.Once());
            mockPersonRepo.Verify(x => x.InsertOrReplaceBatchAsync(It.IsAny<IEnumerable<Models.Person>>()), Times.Once());

            Assert.Equal((recipient.RowKey, recipient.PartitionKey), (returnValue.RowKey, returnValue.PartitionKey));
        }
    }
}