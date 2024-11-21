using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace GiEnJul.Dtos;

public class PostEmailStatusDto
{
    public string? Email { get; set; }
    public long Timestamp { get; set; }
    public string? Event { get; set; }
    public string? Category { get; set; }
    public string? Ip { get; set; }
    public string? Response { get; set; }
    public string? Reason { get; set; }
    public string? Status { get; set; }
    [JsonPropertyName("sg_event_name")]
    [JsonProperty("sg_event_name")]
    public string? EventId { get; set; }
    [JsonPropertyName("sg_message_id")]
    [JsonProperty("sg_message_id")]
    public string? MessageId { get; set; }
    [JsonPropertyName("smtp-id")]
    [JsonProperty("smtp-id")]
    public string? SmtpId { get; set; }
}
