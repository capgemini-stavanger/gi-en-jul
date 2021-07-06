using System;

namespace GiEnJul.Entities
{
    public class Recipient : EntityBase
    {
        public Recipient()
        { }

        // RowKey = Guid
        // PartitionKey = {eventName}_{location}
        public Recipient(string location, string eventName) : base($"{eventName}_{location}", Guid.NewGuid().ToString())
        {
            Location = location ?? throw new ArgumentNullException(nameof(location));
            EventName = eventName ?? throw new ArgumentNullException(nameof(eventName));
        }

        //Family info
        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }
        public string EventName { get; set; }
        public string Location { get; set; }
        public int PersonCount { get; set; }

        //Submitter info
        public string ContactFullName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }

        //Submitter references
        public string Institution { get; set; }
        public string ReferenceId { get; set; }

         //Is the Rowkey to the giver
        public string MatchedGiver { get; set; }
        
        //Match with family, default is false
        public Boolean IsSuggestedMatch { get; set; } = false;
        public Boolean HasConfirmedMatch { get; set; } = false;
    }
}
