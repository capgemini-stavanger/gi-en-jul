namespace GiEnJul.Dtos
{
    public class CreateUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Location { get; set; }
        public string Role { get; set; }
        public string Institution { get; set; }
    }

    public enum MetaDataType
    {
        user_metadata,
        app_metadata
    }
}
