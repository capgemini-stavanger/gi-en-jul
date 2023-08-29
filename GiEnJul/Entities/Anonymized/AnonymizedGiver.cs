using System;

namespace GiEnJul.Entities.Anonymized;

public class AnonymizedGiver : EntityBase
{
    public string? Email { get; set; }
    public int MaxReceivers { get; set; }
    public string? Location { get; set; }
    public string? EventName { get; set; }
    public DateTime RegistrationDate { get; set; }

    //Is the Rowkey to the recipient
    public string? MatchedRecipient { get; set; }
    //Match with family, default is false
    public bool IsSuggestedMatch { get; set; }
    public bool HasConfirmedMatch { get; set; }
}
