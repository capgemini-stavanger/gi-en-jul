using System;

namespace GiEnJul.Dtos.Mappers;

public static class GiverDtoMappers
{
    public static Models.Giver ToModel(this PostGiverDto dto)
    {
        return new Models.Giver
        {
            GiverId = Guid.NewGuid().ToString(),
            Email = dto.Email,
            FullName = dto.FullName,
            Location = dto.Location,
            MaxReceivers = dto.MaxReceivers,
            PhoneNumber = dto.PhoneNumber,
        };
    }

    public static PostGiverResultDto ToPostGiverResultDto(this Models.Giver model)
    {
        return new PostGiverResultDto
        {
            Email = model.Email,
            FullName = model.FullName,
            Location = model.Location,
        };
    }

    public static GiverDataTableDto ToGiverDataTableDto(this Models.Giver model)
    {
        return new GiverDataTableDto
        {
            Email = model.Email,
            Event = model.Event,
            EventName = model.EventName,
            FullName = model.FullName,
            GiverId = model.GiverId,
            Location = model.Location,
            MaxReceivers = model.MaxReceivers,
            PhoneNumber = model.PhoneNumber,
        };
    }
}
