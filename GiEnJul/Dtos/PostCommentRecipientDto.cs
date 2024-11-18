using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostCommentRecipientDto
{
    [Required]
    public string Event { get; set; } = null!;
    [Required]
    public string RecipientId { get; set; } = null!;
    [Required]
    public string Comment { get; set; } = null!;
}
