using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostMunicipalityDto
{
    [Required]
    public string Country { get; set; } = null!;
    [Required]
    public string Name { get; set; } = null!;
    public string? Information { get; set; }
    public bool IsActive { get; set; }
    public string ContactPerson { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? Image { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public string? PhoneNumber { get; set; }

}
