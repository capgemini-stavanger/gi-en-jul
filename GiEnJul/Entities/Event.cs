using System;

namespace GiEnJul.Entities
{
    public class Event : EntityBase
    {
        //PK - EventName
        //RK - City

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryTime { get; set; }
        public string DeliveryGPS { get; set; }
        public string DeliveryDate { get; set; }
        public int GiverLimit { get; set; }

        public bool? Completed { get; set; }
    }
}
