using System.Threading.Tasks;
using GiEnJul.Utilities.EmailTemplates;

namespace GiEnJul.Clients;

public interface IEmailClient
{
    Task SendEmailAsync(string toMail, string toName, EmailTemplate email);
    Task SendEmailFromUserAsync(string fromMail, string fromName, string toMail, string toName, EmailTemplate email);
}
