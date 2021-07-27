using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Dtos
{
    public class GiverDataTableDto
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public int MaxReceivers { get; set; }
        public string Location { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string EventName { get; set; }
    }
}
