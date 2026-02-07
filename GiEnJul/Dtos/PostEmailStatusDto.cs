using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace GiEnJul.Dtos;

public class PostEmailStatusDto
{
    public string? Email { get; set; }
    public long Timestamp { get; set; }
    public string? Event { get; set; }

    [JsonProperty("category")]
    [Newtonsoft.Json.JsonConverter(typeof(CategoryConverter))]
    public string? Category { get; set; }

    public string? Ip { get; set; }
    public string? Response { get; set; }
    public string? Reason { get; set; }
    public string? Status { get; set; }

    [JsonPropertyName("sg_event_id")]
    [JsonProperty("sg_event_id")]
    public string? EventId { get; set; }

    [JsonPropertyName("sg_message_id")]
    [JsonProperty("sg_message_id")]
    public string? MessageId { get; set; }

    [JsonPropertyName("smtp-id")]
    [JsonProperty("smtp-id")]
    public string? SmtpId { get; set; }
    public string? Useragent { get; set; }
    public string? Url { get; set; }
    public string? Attempt { get; set; }
    public int? AsmGroupId { get; set; }
}

public class CategoryConverter : Newtonsoft.Json.JsonConverter<string?>
{
    public override string? ReadJson(JsonReader reader, System.Type objectType, string? existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        if (reader.TokenType == JsonToken.Null)
            return null;

        if (reader.TokenType == JsonToken.String)
            return reader.Value?.ToString();

        if (reader.TokenType == JsonToken.StartArray)
        {
            var categories = serializer.Deserialize<List<string>>(reader);
            return categories?.FirstOrDefault();
        }

        return null;
    }

    public override void WriteJson(JsonWriter writer, string? value, JsonSerializer serializer)
    {
        writer.WriteValue(value);
    }
}
