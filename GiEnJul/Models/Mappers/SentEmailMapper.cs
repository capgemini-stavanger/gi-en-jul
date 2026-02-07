namespace GiEnJul.Models.Mappers;

public static class SentEmailMapper
{
    public static Entities.SentEmail ToEntity(this Models.SentEmail model)
    {
        return new Entities.SentEmail
        {
            PartitionKey = model.Email.ToLower(),
            RowKey = model.MessageId,
            GiverId = model.GiverId,
            RecipientId = model.RecipientId,
            Bounced = model.Bounced,
            Deferred = model.Deferred,
            Delivered = model.Delivered,
            Dropped = model.Dropped,
            Opened = model.Opened,
            Processed = model.Processed,
            SentAt = model.SentAt,
            Title = model.Title,
            Reason = model.Reason,
        };
    }

    public static Models.SentEmail ToModel(this Entities.SentEmail entity)
    {
        return new Models.SentEmail
        {
            Email = entity.PartitionKey.ToLower(),
            MessageId = entity.RowKey,
            GiverId = entity.GiverId,
            RecipientId = entity.RecipientId,
            Bounced = entity.Bounced,
            Deferred = entity.Deferred,
            Delivered = entity.Delivered,
            Dropped = entity.Dropped,
            Opened = entity.Opened,
            Processed = entity.Processed,
            SentAt = entity.SentAt,
            Title = entity.Title,
            Reason = entity.Reason,
        };
    }
}
