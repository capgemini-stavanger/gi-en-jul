namespace GiEnJul.Dtos.Mappers;

public static class EventDtoMappers
{
    public static Models.Event ToModel(this PostEventDto dto)
    {
        return new Models.Event
        {
            DeliveryAddress = dto.DeliveryAddress,
            DeliveryDate = dto.DeliveryDate,
            DeliveryGPS = dto.DeliveryGPS,
            DeliveryTime = dto.DeliveryTime,
            EndDate = dto.EndDate,
            EventName = dto.EventName,
            GiverLimit = dto.GiverLimit,
            Municipality = dto.Municipality,
            SignUpDueDate = dto.SignUpDueDate,
            StartDate = dto.StartDate,
        };
    }
}
