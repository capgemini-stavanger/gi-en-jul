﻿using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;

namespace GiEnJul.Models
{
    public class Recipient
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }
        public string EventName { get; set; }
        public string Location { get; set; }
        
        public string ContactFullName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }

        public string Institution { get; set; }
        public string ReferenceId { get; set; }

        public List<Person> FamilyMembers { get; set; } = new List<Person>();
    }
}
