using Microsoft.Azure.Cosmos.Table;
using Newtonsoft.Json;
using System;

namespace GiEnJul.Models
{
    public class Person : TableEntity
    {
        public Person(string partitionKey)
        {
            PartitionKey = partitionKey;
            RowKey = Guid.NewGuid().ToString();
        }

        public string Wish { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }

    }


    // Following ISO/IEC 5218:2004 gender is stored as:
    // 0 = Not known;
    // 1 = Male;
    // 2 = Female;
    // 9 = Not applicable.
    public enum Gender
    {
        Male = 1,
        Female = 2,
        Unspecified = 0
    }
}
