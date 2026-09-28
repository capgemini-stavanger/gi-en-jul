namespace GiEnJul.Dtos.Mappers;

public static class PersonDtoMappers
{
    public static Models.Person ToModel(this PostPersonDto dto)
    {
        return new Models.Person
        {
            Age = dto.Age,
            Gender = dto.Gender,
            Months = dto.Months,
            NoWish = dto.NoWish,
            Wishes = dto.Wishes,
        };
    }

    public static Models.Person ToModel(this PutPersonDto dto)
    {
        return new Models.Person
        {
            Age = dto.Age,
            Gender = dto.Gender,
            Months = dto.Months,
            NoWish = dto.NoWish,
            Wishes = dto.Wishes,
            PersonId = dto.PersonId,
            RecipientId = dto.RecipientId,
        };
    }

    public static RecipientDataTableDto.PersonDataTableDto ToDataTableDto(this Models.Person model)
    {
        return new RecipientDataTableDto.PersonDataTableDto
        {
            PersonId = model.PersonId,
            Age = model.Age,
            Gender = model.Gender,
            NoWish = model.NoWish,
            Wishes = model.Wishes,
        };
    }

}
