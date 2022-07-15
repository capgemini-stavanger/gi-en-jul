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
        public string DeliveryDate { get; set; }[Required]
        public string DeliveryTime { get; set; }[Required]
        public string ContactPerson { get; set; }[Required]
        public string DeliveryGPS { get; set; }
        public int GiverLimit { get; set; }
        [Required]
        public string Email { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string Image {  get; set; }
        public string PhoneNumber { get; set; }
    }
}
