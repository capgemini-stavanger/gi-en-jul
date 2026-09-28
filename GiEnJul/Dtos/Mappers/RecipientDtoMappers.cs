using System.Linq;

namespace GiEnJul.Dtos.Mappers;

public static class RecipientDtoMappers
{
    public static Models.Recipient ToModel(this PostRecipientDto dto)
    {
        return new Models.Recipient
        {
            FamilyMembers = dto.FamilyMembers.Select(p => p.ToModel()).ToList(),
            ContactEmail = dto.ContactEmail,
            ContactFullName = dto.ContactFullName,
            ContactPhoneNumber = dto.ContactPhoneNumber,
            Dessert = dto.Dessert,
            Dinner = dto.Dinner,
            Institution = dto.Institution,
            Location = dto.Location,
            Note = dto.Note,
            PersonCount = dto.FamilyMembers.Count(),
            ReferenceId = dto.ReferenceId,
        };
    }

    public static RecipientDataTableDto ToRecipientDataTableDto(this Models.Recipient recipient)
    {
        return new RecipientDataTableDto
        {
            ContactEmail = recipient.ContactEmail,
            ContactFullName = recipient.ContactFullName,
            ContactPhoneNumber = recipient.ContactPhoneNumber,
            Dessert = recipient.Dessert,
            Dinner = recipient.Dinner,
            Event = recipient.Event,
            FamilyId = recipient.FamilyId,
            FamilyMembers = recipient.FamilyMembers.Select(p => p.ToDataTableDto()).ToList(),
            Institution = recipient.Institution,
            Note = recipient.Note,
            RecipientId = recipient.RecipientId,
            ReferenceId = recipient.ReferenceId,
        };
    }

    public static Models.Recipient ToModel(this PutRecipientDto dto)
    {
        return new Models.Recipient
        {
            FamilyMembers = dto.FamilyMembers.Select(p => p.ToModel()).ToList(),
            Dessert = dto.Dessert,
            Dinner = dto.Dinner,
            Note = dto.Note,
            PersonCount = dto.FamilyMembers.Count(),
            ReferenceId = dto.ReferenceId,
        };
    }
}
