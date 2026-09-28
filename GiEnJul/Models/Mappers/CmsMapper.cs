namespace GiEnJul.Models.Mappers;

public static class CmsMapper
{
    public static Models.Cms ToModel(this Entities.Cms entity)
    {
        return new Cms
        {
            ContentType = entity.PartitionKey,
            Index = entity.RowKey,
            Info = entity.Info,
            Question = entity.Question,
        };
    }

    public static Entities.Cms ToEntity(this Models.Cms model)
    {
        return new Entities.Cms
        {
            PartitionKey = model.ContentType,
            RowKey= model.Index,
            Info = model.Info,
            Question = model.Question,
        };
    }
}
