namespace GiEnJul.Dtos.Mappers;

public static class CmsDtoMappers
{
    public static Models.Cms ToModel(this PostCmsDto dto)
    {
        return new Models.Cms
        {
            ContentType = dto.ContentType,
            Info = dto.Info,
            Question = dto.Question,
            Index = dto.Index,
        };
    }
}
