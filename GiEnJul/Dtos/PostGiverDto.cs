using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostGiverDto
{
    [Required]
    public string RecaptchaToken { get; set; } = null!;
    [Required]
    [Range(1, 999)]
    public int MaxReceivers { get; set; }
    [Required]
    public string Location { get; set; } = null!;
    [Required]
    public string FullName { get; set; } = null!;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;
    [Required]
    [Phone]
    public string PhoneNumber { get; set; } = null!;
}
