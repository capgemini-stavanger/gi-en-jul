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
        public DateTimeOffset StartDate { get; set; }
        [Required]
        public DateTimeOffset EndDate { get; set; }
        public DateTimeOffset? SignUpDueDate { get; set; }
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
