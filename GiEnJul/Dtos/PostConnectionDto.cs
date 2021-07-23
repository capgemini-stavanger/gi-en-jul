namespace GiEnJul.Dtos
{
    public class PostConnectionDto
    {
        public string GiverRowKey { get; set; }
        public string GiverPartitionKey { get; set; }
        public string RecipientRowKey { get; set; }
        public string RecipientPartitionKey { get; set; }
    }
}