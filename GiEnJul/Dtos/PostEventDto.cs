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
        public string Municipality { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string DeliveryAddress { get; set; }
        [Required]
        public string DeliveryDate { get; set; }
        [Required]
        public string DeliveryTime { get; set; }
        public string DeliveryGPS { get; set; }
        [Required]
        public int GiverLimit { get; set; }
        
    }
}
