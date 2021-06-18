using Microsoft.Azure.Cosmos.Table;
using System.Collections.Generic;

namespace GiEnJul.Models
{
    public class Recipient : TableEntity
    {
        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }
        public string Event { get; set; }
        public string Location { get; set; }

        public string ContactFullName { get; set; }
        public string ContactEmail { get; set; }
        public int ContactPhoneNumber { get; set; }
        public string Institution { get; set; }
        public string ReferenceId { get; set; }

        public List<Person> FamilyMembers { get; set; } = new List<Person>();
        public Giver Giver { get; set; }
    }
}
