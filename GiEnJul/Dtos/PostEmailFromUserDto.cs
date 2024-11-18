using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostEmailFromUserDto
{   
    [Required]
    public string Subject { get; set; } = null!;
    [Required]
    public string Content { get; set; } = null!;
    [Required]
    [EmailAddress]
    public string FromEmail { get; set; } = null!;
    [Required]
    [EmailAddress]
    public string ToEmail { get; set; } = null!;
    public string? FromName { get; set; }
    public string? ToName { get; set; }
}