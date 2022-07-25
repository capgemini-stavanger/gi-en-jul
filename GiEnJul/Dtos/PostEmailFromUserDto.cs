using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostEmailFromUserDto
    {   
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        [EmailAddress]
        public string FromEmail { get; set; }
        [Required]
        [EmailAddress]
        public string ToEmail { get; set; }
        public string FromName { get; set; }
        public string ToName { get; set; }
    }
}