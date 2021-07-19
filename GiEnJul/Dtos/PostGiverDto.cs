using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostGiverDto
    {
        [Required]
        [Range(1, 999)]
        public int MaxReceivers { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
    }
}
