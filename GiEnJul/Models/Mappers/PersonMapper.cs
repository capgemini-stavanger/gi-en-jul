using System;
using System.Collections.Generic;
using System.Text.Json;

namespace GiEnJul.Models.Mappers;

public static class PersonMapper
{
    public static Models.Person ToModel(this Entities.Person entity)
    {
        return new Person
        {
            Age = entity.Age,
            Gender = (Gender)entity.Gender,
            Months = entity.Months,
            NoWish = entity.NoWish,
            PersonId = entity.RowKey,
            RecipientId = entity.PartitionKey,
            Wishes = JsonSerializer.Deserialize<IEnumerable<string>>(entity.Wishes) ?? []
        };
    }

    public static Entities.Person ToEntity(this Models.Person model)
    {
        return new Entities.Person
        {
            Age = model.Age,
            Gender = (int)model.Gender,
            Months = model.Months,
            NoWish = model.NoWish,
            RowKey = string.IsNullOrEmpty(model.PersonId) ? Guid.NewGuid().ToString() : model.PersonId,
            PartitionKey = model.RecipientId,
            Wishes = JsonSerializer.Serialize(model.Wishes),
        };
    }
}
