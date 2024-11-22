using GiEnJul.Helpers;
using GiEnJul.Infrastructure;
using Serilog;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Repositories
{
    public interface IRecipientRepository
    {
        Task<Models.Recipient?> DeleteAsync(Models.Recipient model);
        Task<Models.Recipient> InsertOrReplaceAsync(Models.Recipient model);
        Task<List<Models.Recipient>> GetUnmatchedRecipientsAsync(string location, string currentEvent);
        Task<List<Models.Recipient>> GetAllAsModelAsync();
        Task<Models.Recipient> GetRecipientAsync(string partitionKey, string rowKey);
        Task<IList<Models.Recipient>> GetUnsuggestedAsync(string eventName, string location, int quantity);
        Task<List<Models.Recipient>> GetSuggestedAsync(string eventName, string location);
        Task<List<Models.Recipient>> GetRecipientsByLocationAsync(string eventName, string location);
        Task<List<Models.Recipient>> GetRecipientsByInstitutionAsync(string institution);
        Task<List<Models.Recipient>> GetRecipientsByInstitutionAndEventAsync(string institution, string eventName, string location);
        Task<IEnumerable<Models.Recipient>> GetRecipientsByIdsAsync(IEnumerable<string> ids);
        Task<bool> RecipientDoesExist(string referenceId);
        Task UpdateEmailStatusWarning(string rowKey, bool warning);
    }
    public class RecipientRepository : GenericRepository<Entities.Recipient>, IRecipientRepository
    {
        public RecipientRepository(ISettings settings, ILogger log, string tableName = "Recipient") : base(settings, tableName, log)
        { }

        public async Task<Models.Recipient> InsertOrReplaceAsync(Models.Recipient model)
        {
            var inserted = await InsertOrReplaceAsync(model.ToEntity());
            return inserted.ToModel();
        }

        public async Task<Models.Recipient?> DeleteAsync(Models.Recipient model)
        {
            var deleted = await DeleteAsync(model.ToEntity());
            return deleted?.ToModel();
        }
        public async Task<List<Models.Recipient>> GetUnmatchedRecipientsAsync(string location, string currentEvent)
        {
            var query = $"PartitionKey eq '{currentEvent}_{location}' and " +
                        $"IsMatched eq false";

            var recipients = await GetAllByQueryAsync(query);
            return recipients.Select(r => r.ToModel()).ToList();
        }

        public async Task<bool> RecipientDoesExist(string referenceId)
        {
            var query = $"ReferenceId eq '{referenceId}'";
            var exists = await GetAllByQueryAsync(query);
            if (exists.Count() > 0)
                return true;
           
            else
                return false;
            
        }

        public async Task<List<Models.Recipient>> GetAllAsModelAsync()
        {
            var allRecipients = await GetAllAsync();
            return allRecipients.Select(r => r.ToModel()).ToList();
        }

        public async Task<Models.Recipient> GetRecipientAsync(string partitionKey, string rowKey)
        {
            var recipient = await GetAsync(partitionKey, rowKey);
            return recipient.ToModel();
        }

        public async Task<IList<Models.Recipient>> GetUnsuggestedAsync(string eventName, string location, int quantity)
        {
            var filter = TableQueryFilterHelper.GetUnsuggestedFilter(eventName, location);

            var unsuggestedRecipient = await GetAllByQueryAsync(filter);

            return unsuggestedRecipient.Select(r => r.ToModel()).ToList();
        }

        public async Task<List<Models.Recipient>> GetSuggestedAsync(string eventName, string location)
        {
            var filter = TableQueryFilterHelper.GetSuggestedFilter(eventName, location);

            var suggestedRecipient = await GetAllByQueryAsync(filter);

            return suggestedRecipient.Select(r => r.ToModel()).ToList();
        }
        public async Task<List<Models.Recipient>> GetRecipientsByLocationAsync(string eventName, string location)
        {
            var filter = TableQueryFilterHelper.GetAllByActiveEventsFilter(eventName, location);

            var recipients = await GetAllByQueryAsync(filter);
            return recipients.Select(r => r.ToModel()).ToList();
        }

        public async Task<List<Models.Recipient>> GetRecipientsByInstitutionAsync(string institution)
        {
            var filter = $"Institution eq '{institution}'";
            var recipients = await GetAllByQueryAsync(filter);

            return recipients.Select(r => r.ToModel()).ToList();
        }

        public async Task<List<Models.Recipient>> GetRecipientsByInstitutionAndEventAsync(string institution, string eventName, string location)
        {
            var query = $"Institution eq '{institution}' and PartitionKey eq '{eventName}_{location}'";
            var recipients = await GetAllByQueryAsync(query);

            return recipients.Select(r => r.ToModel()).ToList();
        }

        public async Task<IEnumerable<Models.Recipient>> GetRecipientsByIdsAsync(IEnumerable<string> ids)
        {
            var recipients = await GetAllByRowKey(ids);

            return recipients.Select(r => r.ToModel()).ToList();
        }

        public async Task UpdateEmailStatusWarning(string rowKey, bool warning)
        {
            var recipients = await GetAllByRowKey([rowKey]);
            if (recipients == null || !recipients.Any()) 
            {
                return;
            }
            var recipient = recipients.First();
            recipient.EmailStatusWarning = warning;

            await InsertOrReplaceAsync(recipient);
        }
    }
}
