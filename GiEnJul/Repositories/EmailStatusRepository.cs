using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using GiEnJul.Models.Mappers;
using GiEnJul.Utilities.Constants;
using Serilog;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Repositories;

public interface IEmailStatusRepository
{
    Task<IEnumerable<Models.SentEmail>> GetEmailsByGiverId(string giverId);
    Task<IEnumerable<Models.SentEmail>> GetEmailsByRecipientId(string recipientId);
    Task AddEmail(Models.SentEmail email);
    Task<Models.SentEmail?> UpdateStatus(string messageId, string email, string status, string? reason = null);
}

public class EmailStatusRepository : GenericRepository<SentEmail>, IEmailStatusRepository
{
    public EmailStatusRepository(ISettings settings, ILogger log, string tableName = "EmailStatuses") : base(settings, tableName, log)
    {
    }

    public async Task<IEnumerable<Models.SentEmail>> GetEmailsByRecipientId(string recipientId)
    {
        var emails = await GetAllByQueryAsync($"RecipientId eq '{recipientId}'");
        return emails?.Select(e => e.ToModel()) ?? [];
    }

    public async Task<IEnumerable<Models.SentEmail>> GetEmailsByGiverId(string giverId)
    {
        var emails = await GetAllByQueryAsync($"GiverId eq '{giverId}'");
        return emails?.Select(e => e.ToModel()) ?? [];
    }
    public async Task AddEmail(Models.SentEmail email)
    {
        var entity = email.ToEntity();
        await InsertOrReplaceAsync(entity);
    }

    public async Task<Models.SentEmail?> UpdateStatus(string messageId, string email, string status, string? reason = null)
    {
        if (TryGet(email, messageId, out var entity))
            {

            switch (status)
            {
                case EmailStatuses.Delivered:
                    entity.Delivered = true;
                    break;
                case EmailStatuses.Processed:
                    entity.Processed = true;
                    break;
                case EmailStatuses.Opened:
                    entity.Opened = true;
                    break;
                case EmailStatuses.Bounced:
                    entity.Bounced = true;
                    break;
                case EmailStatuses.Deferred:
                    entity.Deferred = true;
                    break;
                case EmailStatuses.Dropped:
                    entity.Dropped = true;
                    break;
            }
            if (!string.IsNullOrWhiteSpace(reason))
            {
                entity.Reason = reason;
            }

            await InsertOrReplaceAsync(entity);

            return entity.ToModel();
        }
        return null;
    }
}
