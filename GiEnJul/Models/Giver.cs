using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Models
{
    public class Giver : TableEntity
    {
        public int MaxRecievers { get; set; }
        public string Location { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }

        public Recipient Receiver { get; set; }


    }
}
