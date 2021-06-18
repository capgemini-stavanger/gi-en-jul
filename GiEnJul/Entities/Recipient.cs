using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Entities
{
    public class Recipient : TableEntity 
    {
        // RowKey = Guid
        // PartitionKey = loc_{location}
        public Recipient(string location, string refId) : base(location, refId)
        {
            PartitionKey = $"loc_{location}";
            RowKey = refId;
        }

        //Family info
        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; } 
        public string Event { get; set; }
        public int PersonCount { get; set; }
        public string Location { get; set; }

        //Submitter info
        public string FullName { get; set; }        
        public string Email { get; set; }
        public int PhoneNumber { get; set; }

        //Submitter references
        public string Institution { get; set; }
        public string ReferenceId { get; set; }

    }
}
