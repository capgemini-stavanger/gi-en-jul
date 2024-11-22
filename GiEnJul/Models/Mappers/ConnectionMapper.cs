using GiEnJul.Entities;

namespace GiEnJul.Models.Mappers;

public static class ConnectionMapper
{
    public static Models.Giver ToGiver(this Connection entity)
    {
        return new Models.Giver
        {
            GiverId = entity.RowKey.Substring(entity.RowKey.IndexOf('_') + 1),
            Event = entity.PartitionKey,

            FullName = entity.GiverFullName,
            Email = entity.GiverEmail,
            PhoneNumber = entity.GiverPhoneNumber,
            MatchedRecipient = entity.RowKey.Substring(0, entity.RowKey.IndexOf('_') - 1),
            MatchedFamilyId = entity.FamilyId,
            IsSuggestedMatch = true,
            HasConfirmedMatch = true,
            Location = entity.GiverLocation,
        };
    }

    public static Models.Recipient ToRecipient(this Connection entity)
    {
        return new Models.Recipient
        {
            RecipientId = entity.RowKey.Substring(0, entity.RowKey.IndexOf('_') - 1),
            Event = entity.PartitionKey,
            ContactFullName = entity.SubmitterFullName,
            ContactEmail = entity.SubmitterEmail,
            ContactPhoneNumber = entity.SubmitterPhoneNumber,
            MatchedGiver = entity.RowKey.Substring(entity.RowKey.IndexOf('_') + 1),
            IsSuggestedMatch = true,
            HasConfirmedMatch = true,
            Location = entity.ReceiverLocation,
            FamilyId = entity.FamilyId,
            Note = entity.Note,
            ReferenceId = entity.ReferenceId,
        };
    }

}
