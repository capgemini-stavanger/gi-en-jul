namespace GiEnJul.Models
{
    public class Cms
    {
        // PK
        public string ContentType { get; set; } = null!;
        //RK
        public string Index { get; set; } = null!;

        public string? Info { get; set; }

        public string? Question { get; set; }
    }
}
