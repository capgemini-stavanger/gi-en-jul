using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gi_en_jul.Entities
{
    public class Giver : ContactInfo
    {
        public int MaxRecievers { get; set; }

        //Foreign Keys
        public string LocationId { get; set; }
        public string RecipentId { get; set; }
        
    }
}
