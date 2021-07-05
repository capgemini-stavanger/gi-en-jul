using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Entities
{
    public class Recipient : EntityBase 
    {
        public Recipient()
        { }

        // RowKey = Guid
        // PartitionKey = loc_{location}
        public Recipient(string location, string eventName) : base($"{eventName}_{location}", Guid.NewGuid().ToString())
        {
            Location = location ?? throw new ArgumentNullException(nameof(location));
            EventName = eventName ?? throw new ArgumentNullException(nameof(eventName));
        }

        //Family info
        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; } 
        public string EventName { get; set; }
        public int PersonCount { get; set; }
        public string Location { get; set; }

        //Submitter info
        public string ContactFullName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }

        //Submitter references
        public string Institution { get; set; }
        public string ReferenceId { get; set; }

    }
}
