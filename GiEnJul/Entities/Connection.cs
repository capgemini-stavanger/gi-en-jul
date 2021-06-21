using Microsoft.Azure.Cosmos.Table;

namespace GiEnJul.Entities
{
    public class Connection : TableEntity
    {
        // RowKey = Guid
        // PartitionKey = loc_{receiverLocation}
        public Connection(string receiverLocation, string rowKey) : base(receiverLocation, rowKey)
        {
            PartitionKey = $"loc_{receiverLocation}";
            RowKey = rowKey;
        }

		// Family info
        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }
        public string Event { get; set; }
        public string PersonCount { get; set; }
        public string ReceiverLocation { get; set; }

		// Submitter contact info
        public string ReceiverFullName { get; set; }
        public string ReceiverEmail { get; set; }
        public string ReceiverPhoneNumber { get; set; }

		// Submitter references
        public string Institution { get; set; }
        public string ReferenceId { get; set; }

		// Giver info
        public string MaxReceivers { get; set; }
        public string GiverLocation { get; set; }

		// Giver contact info
        public string GiverFullName { get; set; }
        public string GiverEmail { get; set; }
        public string GiverPhoneNumber { get; set; }
    }
}
