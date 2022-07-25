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
        public DateTime RegistrationDate { get; set; }

        //Is the Rowkey to the recipient
        public string MatchedRecipient { get; set; }
        public string MatchedFamilyId { get; set; }

        //Match with family, default is false
        public bool IsSuggestedMatch { get; set; } = false;
        public bool HasConfirmedMatch { get; set; } = false;
        public DateTime? SuggestedMatchAt { get; set; }
        public DateTime? RemindedAt { get; set; }

        //Handle feedback on denying connection
        public string CancelFeedback { get; set; }
        public DateTime? CancelDate { get; set; }
        public string CancelFamilyId { get; set; }

        //Add comment on Giver
        public string Comment { get; set; }
    }
}
