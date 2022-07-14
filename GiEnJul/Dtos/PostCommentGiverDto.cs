namespace GiEnJul.Dtos
{
    public class PostCommentGiverDto
    {
        public string giverPartitionKey { get; set; }
        public string giverRowKey { get; set; }
        public string comment { get; set; }
    }
}
