using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostCommentGiverDto
{
    [Required]
    public string Event { get; set; } = null!;
    [Required]
    public string GiverId { get; set; } = null!;
    [Required]
    public string Comment { get; set; } = null!;
}
