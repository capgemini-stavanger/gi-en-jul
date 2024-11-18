namespace GiEnJul.Dtos
{
    public class CreateUserDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Location { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string Institution { get; set; } = null!;    
    }

    public enum MetaDataType
    {
        user_metadata,
        app_metadata
    }
}
