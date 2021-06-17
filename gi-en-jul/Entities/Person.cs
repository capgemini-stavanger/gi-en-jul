using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gi_en_jul.Entities
{
    public class Person : TableEntity
    {
        //Partisionkey kan holde på PID fra NAV/Barnevernet



        public string Wish { get; set; }
        public int Age { get; set; }
        public bool? Gender { get; set; }

        //Foreign key
        public string RecipentId { get; set; }
    }
}
