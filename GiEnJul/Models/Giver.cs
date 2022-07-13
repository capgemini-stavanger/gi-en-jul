using System;

namespace GiEnJul.Models
{
    public class Giver
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public int MaxReceivers { get; set; }
        public string Location { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string EventName { get; set; }
        public DateTime RegistrationDate { get; set; }

        //Is the Rowkey to the recipient
        public string MatchedRecipient { get; set; }
        public string MatchedFamilyId { get; set; }

        //Match with family, default is false
        public bool IsSuggestedMatch { get; set; } = false;
        public bool HasConfirmedMatch { get; set; } = false;

        //Handle feedback on denying connection
        public string CancelFeedback { get; set; }
        public DateTime? CancelDate { get; set; }
        public string CancelFamilyId { get; set; }

        public Giver ShallowCopy() 
        {
            return (Giver) this.MemberwiseClone();
        }
    }
}
