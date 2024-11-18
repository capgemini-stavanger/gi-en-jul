using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostLocationEmailDto
{
    [Required]
    public string Subject { get; set; } = null!;
    [Required]
    public string Content { get; set; } = null!;
    [Required]
    public string Location { get; set; } = null!;
}