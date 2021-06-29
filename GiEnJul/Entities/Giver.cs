using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Entities
{
    public class Giver : TableEntity
    {
        public Giver() : base()
        {
        }

        public Giver(string location)
        {
            RowKey = Guid.NewGuid().ToString();
            PartitionKey = $"loc_{location}";
            Location = location;
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
        public string PhoneNumber { get; set; }
    }
}
