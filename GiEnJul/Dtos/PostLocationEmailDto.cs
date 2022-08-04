using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostLocationEmailDto
    {
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string Location { get; set; }
    }
}