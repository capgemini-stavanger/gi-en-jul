namespace GiEnJul.Dtos
{
    public class PostCommentRecipientDto
    {
        public string recipientPartitionKey { get; set; }
        public string recipientRowKey { get; set; }
        public string comment { get; set; }
    }
}
