namespace GiEnJul.Entities.Anonymized;

public class AnonymizedConnection : EntityBase
{
    // Family info
    public string? Dinner { get; set; }
    public string? Dessert { get; set; }
    public string? Note { get; set; }
    public string? EventName { get; set; }
    public int PersonCount { get; set; }
    public string? ReceiverLocation { get; set; }
    public string? FamilyId { get; set; }

    // Submitter references
    public string? Institution { get; set; }
    public string? ReferenceId { get; set; }

    // Giver info
    public int MaxReceivers { get; set; }
    public string? GiverLocation { get; set; }
}
