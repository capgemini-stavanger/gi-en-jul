namespace GiEnJul.Dtos;

public class EmailStatusResponseDto
{
    public string Email { get; set; } = null!;
    public string Title { get; set; } = null!;
    public bool HasWarning { get; set; }
    public bool IsDelivered { get; set; }
}
