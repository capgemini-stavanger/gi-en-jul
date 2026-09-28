using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostEmailDto
    {
        [Required]
        public string Subject { get; set; } = null!;
        [Required]
        public string Content { get; set; } = null!;
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; } = null!;
        public string? RecipientName { get; set; }
    }
}