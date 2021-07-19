namespace GiEnJul.Models
{
    public class Giver
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public int MaxReceivers { get; set; }
        public string Location { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string EventName { get; set; }
        //Is the Rowkey to the recipient
        public string MatchedRecipient { get; set; }
        //Match with family, default is false
        public bool IsSuggestedMatch { get; set; } = false;
        public bool HasConfirmedMatch { get; set; } = false;
    }
}
