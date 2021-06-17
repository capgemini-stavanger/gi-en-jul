using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gi_en_jul.Entities
{
    public class Recipent : TableEntity
    {

        public string ReferenceId { get; set; }
        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }

        //Foreign Keys
        public string GiverId { get; set; }
        public string EventId { get; set; }
        public string LocationId { get; set; }

    }
}
