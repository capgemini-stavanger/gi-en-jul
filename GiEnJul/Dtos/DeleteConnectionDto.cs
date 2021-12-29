namespace GiEnJul.Dtos
{
    public class DeleteConnectionDto
    {
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DeleteConnectionDto(string partitionKey, string rowKey)
        {
            PartitionKey = partitionKey;
            RowKey = rowKey;
        }
    }
}
