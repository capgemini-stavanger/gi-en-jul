namespace GiEnJul.Models
{
    public class Giver
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public int MaxRecievers { get; set; }
        public string Location { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string EventName { get; set; }
    }
}
