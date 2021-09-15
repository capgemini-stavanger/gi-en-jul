using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostEventDto
    {
        [Required]
        public string EventName { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string DeliveryAddress { get; set; }
        [Required]
        public string ContactPerson { get; set; }
        [Required]
        public string Email { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
    }
}
