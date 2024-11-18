using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostConnectionDto
{
    [Required]
    public string GiverId { get; set; } = null!;
    [Required]
    public string Event { get; set; } = null!;
    [Required]
    public string RecipientId { get; set; } = null!;
}