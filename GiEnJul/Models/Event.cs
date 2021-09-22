using System;

namespace GiEnJul.Models
{
    public class Event
    {
        // PartitionKey is the EventName
        public string PartitionKey { get; set; }

        // RowKey is the City
        public string RowKey { get; set; }

        public string EventName { get; set; }
        public string City { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string DeliveryAddress { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
    }
}
