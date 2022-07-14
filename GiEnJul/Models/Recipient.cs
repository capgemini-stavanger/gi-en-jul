using System.Collections.Generic;

namespace GiEnJul.Models
{
    public class Recipient
    {
        //RowKey
        public string RecipientId { get; set; }
        //Event_Municipality, corresponds to partitionKey for the Table Entity
        public string Event { get; set; }

        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }
        //Event only
        public string EventName { get; set; }
        public string Location { get; set; }
        public string FamilyId { get; set; }


        public string ContactFullName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }

        public string Institution { get; set; }
        public string ReferenceId { get; set; }

         //Is the Rowkey to the giver
        public string MatchedGiver { get; set; }
        
        //Match with family, default is false
        public bool IsSuggestedMatch { get; set; } = false;
        public bool HasConfirmedMatch { get; set; } = false;

        public List<Person> FamilyMembers { get; set; } = new List<Person>();
        public int PersonCount { get; set; }

        public Recipient ShallowCopy()
        {
            return (Recipient) this.MemberwiseClone();
        }
    }
}
