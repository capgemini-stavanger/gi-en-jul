namespace GiEnJul.Dtos;

public class ConnectionStatusResult
{
    public Status Status { get; set; }
    public string Text { get; set; }
}

public enum Status
{
    Unknown = 0,
    Connected,
    Disconnected,
    Suggested,
    Mismatch,
}