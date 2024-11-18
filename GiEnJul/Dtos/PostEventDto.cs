using System;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos;

public class PostEventDto
{
    [Required]
    public string EventName { get; set; } = null!;
    [Required]
    public string Municipality { get; set; } = null!;
    [Required]
    public DateTimeOffset StartDate { get; set; }
    [Required]
    public DateTimeOffset EndDate { get; set; }
    public DateTimeOffset? SignUpDueDate { get; set; }
    [Required]
    public string DeliveryAddress { get; set; } = null!;
    [Required]
    public string DeliveryDate { get; set; } = null!;
    [Required]
    public string DeliveryTime { get; set; } = null!;
    public string? DeliveryGPS { get; set; }
    [Required]
    public int GiverLimit { get; set; }

}
