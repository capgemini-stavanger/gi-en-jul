using MimeKit;

namespace GiEnJul.Utilities.EmailTemplates
{
    public class EmailTemplate
    {
        public string Subject { get; set; }
        public string Content { get; set; }
        public MimeEntity Body { get; set; }
    }
}
