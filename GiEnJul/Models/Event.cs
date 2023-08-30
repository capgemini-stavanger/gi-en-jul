using System;

namespace GiEnJul.Models
{
    public class Event
    {
        // PartitionKey is the EventName
        public string EventName { get; set; }

        // RowKey is the City
        public string Municipality { get; set; }

        public DateTimeOffset? StartDate { get; set; }
        public DateTimeOffset? EndDate { get; set; }
        public DateTimeOffset? SignUpDueDate { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryDate { get; set; }
        public string DeliveryGPS { get; set; }
        public string DeliveryTime { get; set; }
        public int GiverLimit { get; set; }

        public bool? Completed { get; set; }

    }
}
