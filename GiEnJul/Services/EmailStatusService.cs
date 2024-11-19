using System.Threading.Tasks;

namespace GiEnJul.Services;

public interface IEmailStatusService
{
    Task AddEmail(string email, string messageId, string title);
}

public class EmailStatusService : IEmailStatusService
{
    public EmailStatusService()
    {
    }

    public Task AddEmail(string email, string messageId, string title)
    {
        throw new System.NotImplementedException();
    }
}
