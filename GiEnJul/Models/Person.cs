using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Models
{
    public class Person : TableEntity
    {
        public string Wish { get; set; }
        public int Age { get; set; }
        //public char Gender { get; set; } ?
        public int Gender { get; set; }


        public Recipient Family { get; set; }
    }
}
