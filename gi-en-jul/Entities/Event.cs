using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gi_en_jul.Entities
{
    public class Event : TableEntity
    {
        public string Name { get; set; }
        //public DateTime EndDate { get; set; } ??
    }
}
