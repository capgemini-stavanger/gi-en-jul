using Models = GiEnJul.Models;
using Entities = GiEnJul.Entities;
using System;

public static class RecipientMapper
{
    public static Models.Recipient ToModel(this Entities.Recipient entity)
    {
        return new Models.Recipient
        {
            RecipientId = entity.RowKey,
            Event = entity.PartitionKey,

            Comment = entity.Comment,
            ContactEmail = entity.ContactEmail,
            ContactFullName = entity.ContactFullName,
            ContactPhoneNumber = entity.ContactPhoneNumber,
            Dessert = entity.Dessert,
            Dinner = entity.Dinner,
            EmailStatusWarning = entity.EmailStatusWarning,
            EventName = entity.EventName,
            FamilyId = entity.FamilyId,
            HasConfirmedMatch = entity.HasConfirmedMatch,
            Institution = entity.Institution,
            IsSuggestedMatch = entity.IsSuggestedMatch,
            Location = entity.Location,
            MatchedGiver = entity.MatchedGiver,
            Note = entity.Note,
            PersonCount = entity.PersonCount,
            ReferenceId = entity.ReferenceId,
        };
    }

    public static Entities.Recipient ToEntity(this Models.Recipient model)
    {
        return new Entities.Recipient
        {
            RowKey = string.IsNullOrEmpty(model.RecipientId) ? Guid.NewGuid().ToString() : model.RecipientId,
            PartitionKey = string.IsNullOrEmpty(model.Event) ? $"{model.EventName}_{model.Location}" : model.Event,

            Comment = model.Comment,
            ContactEmail = model.ContactEmail,
            ContactFullName = model.ContactFullName,
            ContactPhoneNumber = model.ContactPhoneNumber,
            Dessert = model.Dessert,
            Dinner = model.Dinner,
            EmailStatusWarning = model.EmailStatusWarning,
            EventName = model.EventName,
            FamilyId = model.FamilyId,
            HasConfirmedMatch = model.HasConfirmedMatch,
            Institution = model.Institution,
            IsSuggestedMatch = model.IsSuggestedMatch,
            Location = model.Location,
            MatchedGiver = model.MatchedGiver,
            Note = model.Note,
            PersonCount = model.PersonCount,
            ReferenceId = model.ReferenceId,
        };
    }
}
