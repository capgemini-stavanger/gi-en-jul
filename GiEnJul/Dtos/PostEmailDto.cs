using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostEmailDto
    {   
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
        public string RecipientName { get; set; }
    }
}