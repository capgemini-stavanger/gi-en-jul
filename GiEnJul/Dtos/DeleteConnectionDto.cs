namespace GiEnJul.Dtos
{
    public class DeleteConnectionDto
    {
        public string Event { get; set; }
        public string ConnectedIds { get; set; } //recId_givId
        public DeleteConnectionDto(string @event, string connctedIds)
        {
            Event = @event;
            ConnectedIds = connctedIds;
        }
    }
}
