namespace GiEnJul.Models.Mappers;

public static class EventMapper
{
    public static Models.Event ToModel(this Entities.Event entity)
    {
        return new Event
        {
            EventName = entity.PartitionKey,
            Municipality = entity.RowKey,

            Completed = entity.Completed,
            DeliveryAddress = entity.DeliveryAddress,
            DeliveryDate = entity.DeliveryDate,
            DeliveryGPS = entity.DeliveryGPS,
            DeliveryTime = entity.DeliveryTime,
            EndDate = entity.EndDate,
            GiverLimit = entity.GiverLimit,
            SignUpDueDate = entity.SignUpDueDate,
            StartDate = entity.StartDate,
        };
    }

    public static Entities.Event ToEntity(this Models.Event model)
    {
        return new Entities.Event
        {
            PartitionKey = model.EventName,
            RowKey = model.Municipality,

            Completed = model.Completed,
            DeliveryAddress = model.DeliveryAddress,
            DeliveryDate = model.DeliveryDate,
            DeliveryGPS = model.DeliveryGPS,
            DeliveryTime = model.DeliveryTime,
            EndDate = model.EndDate,
            GiverLimit = model.GiverLimit,
            SignUpDueDate = model.SignUpDueDate,
            StartDate = model.StartDate,
        };
    }
}
