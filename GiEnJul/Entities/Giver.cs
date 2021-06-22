using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Cosmos.Table;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Entities
{
    public class Giver : TableEntity
    {
        // RowKey = Guid
        // PartitionKey = loc_{location}
        public Giver(string location, string rowKey) : base(location, rowKey)
        {
            PartitionKey = $"loc_{location}";
            RowKey = rowKey;
        }

        public int MaxRecievers { get; set; }
        public string Location { get; set; }

        [ProtectedPersonalData]
        public string FullName { get; set; }
        [ProtectedPersonalData]
        [EmailAddress]
        public string Email { get; set; }
        [ProtectedPersonalData]
        [Phone]
        public int PhoneNumber { get; set; }
    }
}
