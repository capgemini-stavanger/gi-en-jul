using Microsoft.Azure.Cosmos.Table;

namespace GiEnJul.Models
{
    public class Person : TableEntity
    {
        public string Wish { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }

        public Recipient Family { get; set; }
    }

    public enum Gender
    {
        Male,
        Female,
        Unspecified
    }
}
