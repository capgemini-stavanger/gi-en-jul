using AutoMapper;
using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Repositories
{
    public interface IGiverRepository
    {
        Task<Models.Giver> DeleteAsync(Models.Giver model);
        Task<Models.Giver> InsertOrReplaceAsync(Models.Giver model);
        Task<IEnumerable<Models.Giver>> GetAllAsModelAsync();
        Task<Models.Giver> GetGiverAsync(string partitionKey, string rowKey);
        Task<IList<Models.Giver>> GetSuggestionsAsync(string eventName, string location);
    }

    public class GiverRepository : GenericRepository<Entities.Giver>, IGiverRepository
    {
        public GiverRepository(ISettings settings, IMapper mapper, ILogger logger, string tableName = "Giver") : base(settings, tableName, mapper, logger)
        { }

        public async Task<Models.Giver> DeleteAsync(Models.Giver model)
        {
            var deleted = await DeleteAsync(_mapper.Map<Entities.Giver>(model));
            return _mapper.Map<Models.Giver>(deleted);
        }

        public async Task<Models.Giver> InsertOrReplaceAsync(Models.Giver model)
        {
            var inserted = await InsertOrReplaceAsync(_mapper.Map<Entities.Giver>(model));
            return _mapper.Map<Models.Giver>(inserted);
        }

        public async Task<IEnumerable<Models.Giver>> GetAllAsModelAsync()
        {
            var allGivers = await GetAllAsync();
            return _mapper.Map<IEnumerable<Models.Giver>>(allGivers);
        }
        public async Task<Models.Giver> GetGiverAsync(string partitionKey, string rowKey)
        {
            var giver = await GetAsync(partitionKey, rowKey);
            return _mapper.Map<Models.Giver>(giver);
        }

        public async Task<IList<Models.Giver>> GetSuggestionsAsync(string eventName, string location)
        {
            var PKfilter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, $"{eventName}_{location}");
            var notSuggestedFilter = TableQuery.GenerateFilterConditionForBool("IsSuggestedMatch", QueryComparisons.Equal, false);
            var notConfirmedFilter = TableQuery.GenerateFilterConditionForBool("HasConfirmedMatch", QueryComparisons.Equal, false);
            var eventNameFilter = TableQuery.GenerateFilterCondition("EventName", QueryComparisons.Equal, eventName);
            var locationFilter = TableQuery.GenerateFilterCondition("Location", QueryComparisons.Equal, location);

            var filter = TableQuery
                .CombineFilters(PKfilter, TableOperators.And, TableQuery
                .CombineFilters(notSuggestedFilter, TableOperators.And, TableQuery
                .CombineFilters(notConfirmedFilter, TableOperators.And, TableQuery
                .CombineFilters(eventNameFilter, TableOperators.And, locationFilter))));

            var query = new TableQuery<Entities.Giver>().Where(filter);

            var givers = await GetAllByQueryAsync(query);

            return _mapper.Map<IList<Models.Giver>>(givers);
        }
    }
}