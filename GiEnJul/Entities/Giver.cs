using GiEnJul.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul
{
    public class Giver : TableEntity
    {
        // RowKey = Guid
        // PartitionKey = loc_{location}
        public Giver(string location, string rowKey) : base(location, rowKey)
        {
            PartitionKey = $"loc_{location}";
        }

        public int MaxRecievers { get; set; }
        public string Location { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
    }
}
