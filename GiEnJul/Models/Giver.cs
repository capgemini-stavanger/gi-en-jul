using Microsoft.Azure.Cosmos.Table;
using Newtonsoft.Json;

namespace GiEnJul.Models
{
    public class Giver : TableEntity
    {
        public Giver(string location, string rowKey) : base(location, rowKey)
        {
            PartitionKey = $"loc_{location}";
            RowKey = rowKey;
        }

        public int MaxRecievers { get; set; }
        public string Location { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }

        [JsonIgnore]
        public Recipient Receiver { get; set; }


    }
}
