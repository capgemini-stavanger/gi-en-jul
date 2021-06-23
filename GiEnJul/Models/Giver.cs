using Microsoft.Azure.Cosmos.Table;
using Newtonsoft.Json;
using System;

namespace GiEnJul.Models
{
    public class Giver : TableEntity
    {

        public Giver(string location)
        {
            RowKey = Guid.NewGuid().ToString();
            PartitionKey = $"loc_{location}";
            Location = location;
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
