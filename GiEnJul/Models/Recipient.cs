using System.Collections.Generic;

namespace GiEnJul.Models;

public class Recipient
{
    //RowKey
    public string RecipientId { get; set; } = null!;
    //Event_Municipality, corresponds to partitionKey for the Table Entity
    public string Event { get; set; } = null!;

    public string Dinner { get; set; } = null!;
    public string Dessert { get; set; } = null!;
    public string? Note { get; set; }
    //Event only
    public string EventName { get; set; } = null!;
    public string Location { get; set; } = null!;
    public string? FamilyId { get; set; }


    public string ContactFullName { get; set; } = null!;
    public string? ContactEmail { get; set; }
    public string? ContactPhoneNumber { get; set; }

    public string Institution { get; set; } = null!;
    public string? ReferenceId { get; set; }

     //Is the Rowkey to the giver
    public string? MatchedGiver { get; set; }
    
    //Match with family, default is false
    public bool IsSuggestedMatch { get; set; } = false;
    public bool HasConfirmedMatch { get; set; } = false;

    //Add comment
    public string? Comment { get; set; }
    public bool EmailStatusWarning { get; set; } = false;

    public List<Person> FamilyMembers { get; set; } = new List<Person>();
    public int PersonCount { get; set; }

    public Recipient ShallowCopy()
    {
        return (Recipient) this.MemberwiseClone();
    }
}
