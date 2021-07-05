namespace GiEnJul.Models
{
    public class Person
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public string Wish { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
    }

    public enum Gender
    {
        Male = 1,
        Female = 2,
        Unspecified = 0
    }
}
