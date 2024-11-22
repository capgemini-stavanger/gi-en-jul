using System;

namespace GiEnJul.Models.Mappers;

public static class GiverMapper
{
    public static Models.Giver ToModel(this Entities.Giver entity)
    {
        return new Models.Giver
        {
            Event = entity.PartitionKey,
            GiverId = entity.RowKey,
            CancelDate = entity.CancelDate,
            CancelFamilyId = entity.CancelFamilyId,
            CancelFeedback = entity.CancelFeedback,
            Comment = entity.Comment,
            Email = entity.Email,
            EmailStatusWarning = entity.EmailStatusWarning,
            EventName = entity.EventName,
            FullName = entity.FullName,
            HasConfirmedMatch = entity.HasConfirmedMatch,
            IsSuggestedMatch = entity.IsSuggestedMatch,
            Location = entity.Location,
            MatchedFamilyId = entity.MatchedFamilyId,
            MatchedRecipient = entity.MatchedRecipient,
            MaxReceivers = entity.MaxReceivers,
            PhoneNumber = entity.PhoneNumber,
            RegistrationDate = entity.RegistrationDate,
            RemindedAt = entity.RemindedAt,
            SuggestedMatchAt = entity.SuggestedMatchAt,
        };
    }

    public static Entities.Giver ToEntity(this Models.Giver model)
    {
        return new Entities.Giver
        {
            PartitionKey = string.IsNullOrEmpty(model.Event) ? $"{model.EventName}_{model.Location}" : model.Event,
            RowKey = string.IsNullOrEmpty(model.GiverId) ? Guid.NewGuid().ToString() : model.GiverId,

            CancelDate = model.CancelDate,
            CancelFamilyId = model.CancelFamilyId,
            CancelFeedback = model.CancelFeedback,
            Comment = model.Comment,
            Email = model.Email,
            EmailStatusWarning = model.EmailStatusWarning,
            EventName = model.EventName,
            FullName = model.FullName,
            HasConfirmedMatch = model.HasConfirmedMatch,
            IsSuggestedMatch = model.IsSuggestedMatch,
            Location = model.Location,
            MatchedFamilyId = model.MatchedFamilyId,
            MatchedRecipient = model.MatchedRecipient,
            MaxReceivers = model.MaxReceivers,
            PhoneNumber = model.PhoneNumber,
            RegistrationDate = model.RegistrationDate,
            RemindedAt = model.RemindedAt,
            SuggestedMatchAt = model.SuggestedMatchAt,
        };
    }
}
