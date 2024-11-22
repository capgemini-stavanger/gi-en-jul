using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostRecipientDto
{
    [Required]
    public string Dinner { get; set; } = null!;
    [Required]
    public string Dessert { get; set; } = null!;
    public string? Note { get; set; }
    [Required]
    public string Location { get; set; } = null!;

    [Required]
    public string ContactFullName { get; set; } = null!;
    [EmailAddress]
    public string? ContactEmail { get; set; }
    [Phone]
    public string? ContactPhoneNumber { get; set; }

    [Required]
    public string Institution { get; set; } = null!;
    public string? ReferenceId { get; set; }

    [Required]
    [MinLength(1)]
    [MaxLength(999)]
    public List<PostPersonDto> FamilyMembers { get; set; } = [];
}
