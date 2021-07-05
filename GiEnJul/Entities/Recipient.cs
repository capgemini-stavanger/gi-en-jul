using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Entities
{
    public class Recipient : EntityBase
    {
        public Recipient()
        { }

        // RowKey = Guid
        // PartitionKey = loc_{location}
        public Recipient(string location, string rowKey)
        {
            PartitionKey = $"loc_{location}";
            RowKey = rowKey;
        }

        //Family info
        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }
        public string Event { get; set; }
        public int PersonCount { get; set; }
        public string Location { get; set; }

        //Submitter info
        [ProtectedPersonalData]
        public string ContactFullName { get; set; }
        [ProtectedPersonalData]
        [EmailAddress]
        public string ContactEmail { get; set; }
        [ProtectedPersonalData]
        [Phone]
        public string ContactPhoneNumber { get; set; }

        //Submitter references
        public string Institution { get; set; }
        public string ReferenceId { get; set; }
    }
}
