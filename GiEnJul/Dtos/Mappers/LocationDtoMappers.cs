namespace GiEnJul.Dtos.Mappers;

public static class LocationDtoMappers
{
    public static Models.Municipality ToModel(this DeleteMunicipalityDto dto)
    {
        return new Models.Municipality
        {
            Name = dto.Name,
            Country = dto.Country,
        };
    }

    public static Models.Municipality ToModel(this PostMunicipalityDto dto)
    {
        return new Models.Municipality
        {
            Country = dto.Country,
            Name = dto.Name,
            Facebook = dto.Facebook,
            Image = dto.Image,
            Information = dto.Information,
            Instagram = dto.Instagram,
            IsActive = dto.IsActive,
            PhoneNumber = dto.PhoneNumber,
            ContactPerson = dto.ContactPerson,
            Email = dto.Email,
        };
    }

    public static GetMunicipalityDto ToGetMunicipalityDto(this Models.Municipality model)
    {
        return new GetMunicipalityDto
        {
            Email = model.Email,
            ContactPerson = model.ContactPerson,
            Country = model.Country,
            Facebook = model.Facebook,
            Image = model.Image,
            Information = model.Information,
            Instagram = model.Instagram,
            IsActive = model.IsActive,
            Name = model.Name,
            PhoneNumber = model.PhoneNumber,
        };
    }

    public static GetContactsDto ToGetContactsDto(this Models.Municipality model)
    {
        return new GetContactsDto
        {
            ContactPerson = model.ContactPerson,
            Email = model.Email,
            Facebook = model.Facebook,
            Image = model.Image,
            Instagram = model.Instagram,
            Name = model.Name,
            PhoneNumber = model.PhoneNumber,
        };
    }
}
