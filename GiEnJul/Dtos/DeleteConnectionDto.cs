namespace GiEnJul.Dtos
{
    public class DeleteConnectionDto
    {
        public string Event { get; set; }
        public string GiverId { get; set; }
        public string RecipientId { get; set; }

        public DeleteConnectionDto(string @event, string giverId, string recipientId)
        {
            Event = @event;
            GiverId = giverId;
            RecipientId = recipientId;
        }
    }
}
