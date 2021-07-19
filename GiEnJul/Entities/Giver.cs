using System;

namespace GiEnJul.Entities
{
    public class Giver : EntityBase
    {
        public Giver()
        { }

        public Giver(string location, string eventName) : base($"{eventName}_{location}", Guid.NewGuid().ToString())
        {
            Location = location ?? throw new ArgumentNullException(nameof(location));
            EventName = eventName ?? throw new ArgumentNullException(nameof(eventName));
        }

        public int MaxReceivers { get; set; }
        public string Location { get; set; }
        public string EventName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        //Is the Rowkey to the recipient
        public string MatchedRecipient { get; set; }

        //Match with family, default is false
        public Boolean IsSuggestedMatch { get; set; } = false;
        public Boolean HasConfirmedMatch { get; set; } = false;
    }
}
