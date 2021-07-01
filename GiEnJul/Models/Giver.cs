using Microsoft.Azure.Cosmos.Table;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Models
{
    public class Giver : TableEntity
    {

        public Giver(string eventName, string location)
        {
            RowKey = Guid.NewGuid().ToString();
            PartitionKey = $"{eventName}_{location}";
            Event = eventName;
            Location = location;
        }

        [Required]
        [Range(1, 999)]
        public int MaxRecievers { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
        public string Event { get; set; }

        public Recipient Receiver { get; set; }


    }
}
