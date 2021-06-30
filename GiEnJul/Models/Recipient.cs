using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Models
{
    public class Recipient : TableEntity
    {
        public Recipient(string location)
        {
            RowKey = Guid.NewGuid().ToString();
            PartitionKey = $"loc_{location}";
            Location = location;
        }

        [Required]
        public string Dinner { get; set; }
        [Required]
        public string Dessert { get; set; }
        public string Note { get; set; }
        [Required]
        public string Event { get; set; }
        [Required]
        public string Location { get; set; }
        
        [Required]
        public string ContactFullName { get; set; }
        [Required]
        [EmailAddress]
        public string ContactEmail { get; set; }
        [Required]
        [Phone]
        public string ContactPhoneNumber { get; set; }
        [Required]
        public string Institution { get; set; }
        public string ReferenceId { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(999)]
        public List<Person> FamilyMembers { get; set; } = new List<Person>();
        public Giver Giver { get; set; }
    }
}
