namespace GiEnJul.Dtos.Mappers;

public static class ConnectionDtoMappers
{
    public static GetConnectionDto ToGetConnectionDto(this (Models.Giver, Models.Recipient) tuple)
    {
        return new GetConnectionDto
        {
            Confirmed = tuple.Item1.HasConfirmedMatch,
            FamilyId = tuple.Item2.FamilyId,
            FullName = tuple.Item1.FullName,
            PhoneNumber = tuple.Item1.PhoneNumber,
            PersonCount = tuple.Item2.PersonCount,
            SubmitterEmail = tuple.Item2.ContactEmail,
            SubmitterFullName = tuple.Item2.ContactPhoneNumber
        };
    }
}
