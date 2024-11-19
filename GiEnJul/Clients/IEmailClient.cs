using System.Threading.Tasks;
using GiEnJul.Utilities.EmailTemplates;

namespace GiEnJul.Clients;

public interface IEmailClient
{
    Task SendEmailAsync(string toMail, string? toName, EmailTemplate email, string? giverId = null, string? recipientId = null);
    Task SendEmailFromUserAsync(string fromMail, string? fromName, string toMail, string? toName, EmailTemplate email, string? giverId = null, string? recipientId = null);
}
