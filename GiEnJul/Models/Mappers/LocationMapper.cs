namespace GiEnJul.Models.Mappers;

public static class LocationMapper
{
    public static Municipality ToModel(this Entities.Municipality entity)
    {
        return new Municipality
        {
            Country = entity.PartitionKey,
            Name = entity.RowKey,
            ContactPerson = entity.ContactPerson,
            Email = entity.Email,
            Facebook = entity.Facebook,
            Image = entity.Image,
            Information = entity.Information,
            Instagram = entity.Instagram,
            IsActive = entity.IsActive,
            PhoneNumber = entity.PhoneNumber,
        };
    }

    public static Entities.Municipality ToEntity(this Municipality model)
    {
        return new Entities.Municipality
        {
            PartitionKey = model.Country,
            RowKey = model.Name,
            ContactPerson = model.ContactPerson,
            Email = model.Email,
            Facebook = model.Facebook,
            Image = model.Image,
            Information = model.Information,
            Instagram = model.Instagram,
            IsActive = model.IsActive,
            PhoneNumber = model.PhoneNumber,
        };
    }
}
