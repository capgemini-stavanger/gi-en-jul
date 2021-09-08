using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostEventDto
    {
        [Required]
        public string EventType { get; set; }
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
