namespace GiEnJul.Dtos.Mappers;

public static class EmailStatusDtoMappers
{
    public static EmailStatusResponseDto ToResponseDto(this Models.SentEmail model)
    {
        return new EmailStatusResponseDto
        {
            Email = model.Email,
            HasWarning = model.HasError,
            IsDelivered = model.Delivered,
            Title = model.Title,
        };
    }
}
