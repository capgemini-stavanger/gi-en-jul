using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Dtos
{
    public class RecipientDataTableDto
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public int PersonCount { get; set; }
        public string FamilyId { get; set; }


        public string Location { get; set; }
        public string EventName { get; set; }

    }
}
