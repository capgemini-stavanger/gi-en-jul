using MimeKit;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;

namespace GiEnJul.Utilities.EmailTemplates;

public class EmailTemplate
{
    public string Subject { get; set; } = null!;
    public string Content { get; set; } = null!;
    public MimeEntity? Body { get; set; }
    public string? SendGridBody {  get; set; }
    public List<string>? Attachments { get; set; }
    public Attachment? SendGridAttachment { get; set; }
}
