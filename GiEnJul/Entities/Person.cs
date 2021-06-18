using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Entities
{
    public class Person : TableEntity
    {
        // RowKey = Guid
        // PartitionKey = RefId_{ReferenceId} (PID from NAV/Barnevernet)
        public Person(string referenceId, string rowKey) : base(referenceId, rowKey)
        {
            RowKey = rowKey;
            PartitionKey = $"RefId_{referenceId}";
        }

        public string Wish { get; set; }
        public int Age { get; set; }
        // Following ISO/IEC 5218:2004 gender is stored as:
        // 0 = Not known;
        // 1 = Male;
        // 2 = Female;
        // 9 = Not applicable.
        public int Gender { get; set; }
    }
}
