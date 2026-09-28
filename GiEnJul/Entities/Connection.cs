using GiEnJul.Exceptions;

namespace GiEnJul.Entities;

public class Connection : EntityBase
{
    public Connection()
    { }

    public Connection(string receiverLocation, string rowKey) : base(receiverLocation, rowKey)
    { }
    public Connection(Giver giver, Recipient recipient)
    {
        if (giver.PartitionKey != recipient.PartitionKey)
        {
            throw new InvalidEventException("Locations/events must match for giver and recipient");
        }
        RowKey = $"{recipient.RowKey}_{giver.RowKey}";
        PartitionKey = giver.PartitionKey;

        Dinner = recipient.Dinner;
        Dessert = recipient.Dessert;
        Note = recipient.Note;
        EventName = recipient.EventName;
        PersonCount = recipient.PersonCount;
        ReceiverLocation = recipient.Location;
        FamilyId = recipient.FamilyId;

        SubmitterFullName = recipient.ContactFullName;
        SubmitterEmail = recipient.ContactEmail;
        SubmitterPhoneNumber = recipient.ContactPhoneNumber;

        Institution = recipient.Institution;
        ReferenceId = recipient.ReferenceId;

        MaxReceivers = giver.MaxReceivers;
        GiverLocation = giver.Location;
        GiverFullName = giver.FullName;
        GiverEmail = giver.Email;
        GiverPhoneNumber = giver.PhoneNumber;
    }

    // Family info
    public string Dinner { get; set; } = null!;
    public string Dessert { get; set; } = null!;
    public string? Note { get; set; }
    public string EventName { get; set; } = null!;
    public int PersonCount { get; set; }
    public string ReceiverLocation { get; set; } = null!;
    public string? FamilyId { get; set; }

    // Submitter contact info
    public string SubmitterFullName { get; set; } = null!;
    public string? SubmitterEmail { get; set; }
    public string? SubmitterPhoneNumber { get; set; }

    // Submitter references
    public string Institution { get; set; } = null!;
    public string? ReferenceId { get; set; }

    // Giver info
    public int MaxReceivers { get; set; }
    public string GiverLocation { get; set; } = null!;

    // Giver contact info
    public string GiverFullName { get; set; } = null!;
    public string GiverEmail { get; set; } = null!;
    public string GiverPhoneNumber { get; set; } = null!;
}
