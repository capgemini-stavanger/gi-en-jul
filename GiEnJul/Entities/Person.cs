using Microsoft.Azure.Cosmos.Table;
using System;

namespace GiEnJul.Entities
{
    public class Person : EntityBase
    {
        public Person()
        { }

        // RowKey = Guid
        // PartitionKey = {recipientId}
        public Person(string recipientId) // : base(recipientId ?? throw new ArgumentNullException(nameof(recipientId)), Guid.NewGuid().ToString())
        {
            PartitionKey = recipientId;
            RowKey = Guid.NewGuid().ToString();
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
