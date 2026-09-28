using GiEnJul.Helpers;
using GiEnJul.Infrastructure;
using GiEnJul.Models.Mappers;
using Serilog;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace GiEnJul.Repositories
{
    public interface IGiverRepository
    {
        Task<Models.Giver?> DeleteAsync(Models.Giver model);
        Task<Models.Giver> InsertOrReplaceAsync(Models.Giver model);
        Task<IEnumerable<Models.Giver>> GetAllAsModelAsync();
        Task<Models.Giver> GetGiverAsync(string partitionKey, string rowKey);
        Task<IList<Models.Giver>> GetUnsuggestedAsync(string eventName, string location, int quantity);
        Task<IEnumerable<Models.Giver>> GetGiversByLocationAsync(string eventName, string location);
        Task<int> GetGiversCountByLocationAsync(string eventName, string location);
        Task<List<Models.Giver>> GetSuggestedAsync(string eventName, string location);
        Task<IEnumerable<Models.Giver>> GetGiversByQueryAsync(string query);
        Task UpdateEmailStatusWarning(string rowKey, bool warning);
    }

    public class GiverRepository : GenericRepository<Entities.Giver>, IGiverRepository
    {
        public GiverRepository(ISettings settings, ILogger logger, string tableName = "Giver") : base(settings, tableName, logger)
        { }

        public async Task<Models.Giver?> DeleteAsync(Models.Giver model)
        {
            var deleted = await DeleteAsync(model.ToEntity());
            return deleted?.ToModel();
        }

        public async Task<Models.Giver> InsertOrReplaceAsync(Models.Giver model)
        {
            var inserted = await InsertOrReplaceAsync(model.ToEntity());
            return inserted.ToModel();
        }

        public async Task<IEnumerable<Models.Giver>> GetAllAsModelAsync()
        {
            var allGivers = await GetAllAsync();
            return allGivers.Select(g => g.ToModel());
        }
        public async Task<Models.Giver> GetGiverAsync(string partitionKey, string rowKey)
        {
            var giver = await GetAsync(partitionKey, rowKey);
            return giver.ToModel();
        }

        public async Task<IList<Models.Giver>> GetUnsuggestedAsync(string eventName, string location, int quantity)
        {
            var filter = TableQueryFilterHelper.GetUnsuggestedFilter(eventName, location);

            var unsuggestedGivers = await GetAllByQueryAsync(filter);

            return unsuggestedGivers.Select(g => g.ToModel()).ToList();
        }

        public async Task<List<Models.Giver>> GetSuggestedAsync(string eventName, string location)
        {
            var filter = TableQueryFilterHelper.GetSuggestedFilter(eventName, location);

            var suggestedGivers = await GetAllByQueryAsync(filter);

            return suggestedGivers.Select(g => g.ToModel()).ToList();
        }

        public async Task<IEnumerable<Models.Giver>> GetGiversByLocationAsync(string eventName, string location)
        {
            var filter = TableQueryFilterHelper.GetAllByActiveEventsFilter(eventName, location);
            var givers = await GetAllByQueryAsync(filter);
            return givers.Select(g => g.ToModel()).ToList();
        }

        public async Task<int> GetGiversCountByLocationAsync(string eventName, string location)
        {
            var givers = await GetGiversByLocationAsync(eventName, location);
            return givers.Count();
        }

        public async Task<IEnumerable<Models.Giver>> GetGiversByQueryAsync(string query)
        {
            var givers = await GetAllByQueryAsync(query);
            return givers.Select(g => g.ToModel()).ToList();
        }

        public async Task UpdateEmailStatusWarning(string rowKey, bool warning)
        {
            var givers = await GetAllByRowKey([rowKey]);
            if (givers == null || !givers.Any())
            {
                return;
            }
            var giver = givers.First();
            giver.EmailStatusWarning = warning;
            await InsertOrReplaceAsync(giver);
        }
    }
}
