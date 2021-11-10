using GiEnJul.Models;
using System.Collections.Generic;

namespace GiEnJul.Dtos
{
    public class RecipientDataTableDto
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }
        public string FamilyId { get; set; }

        public string ContactFullName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }

        public string Institution { get; set; }
        public string ReferenceId { get; set; }

        public List<PersonDataTableDto> FamilyMembers { get; set; }

        public class PersonDataTableDto
        {
            public string RowKey { get; set; }
            public string Wish { get; set; }
            public int Age { get; set; }
            public Gender Gender { get; set; }
            public string Comment { get; set; }
        }
    }
}
