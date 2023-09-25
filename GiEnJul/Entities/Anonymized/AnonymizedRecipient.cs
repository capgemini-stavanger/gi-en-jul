namespace GiEnJul.Entities.Anonymized;

public class AnonymizedRecipient : EntityBase
{
    //Family info
    public string Dinner { get; set; }
    public string Dessert { get; set; }
    public string Note { get; set; }
    public string EventName { get; set; }
    public string Location { get; set; }
    public int PersonCount { get; set; }
    public string FamilyId { get; set; }

    //Submitter info
    public string ContactFullName { get; set; }
    public string ContactEmail { get; set; }

    //Submitter references
    public string Institution { get; set; }
    public string ReferenceId { get; set; }

    //Is the Rowkey to the giver
    public string MatchedGiver { get; set; }

    //Match with family, default is false
    public bool IsSuggestedMatch { get; set; } = false;
    public bool HasConfirmedMatch { get; set; } = false;

    //Add comment
    public string Comment { get; set; }
}
