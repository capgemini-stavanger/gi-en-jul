using AutoMapper;
using GiEnJul.Infrastructure;
using Serilog;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos.Table;
namespace GiEnJul.Features
{
    public interface IRecipientRepository : IGenericRepository<Entities.Recipient>
    {
        Task<Models.Recipient> DeleteAsync(Models.Recipient model);
        Task<Models.Recipient> InsertOrReplaceAsync(Models.Recipient model);
        Task<Models.Recipient> GetUnmatchedRecipientsAsync(string location, string currentEvent);
    }
    public class RecipientRepository : GenericRepository<Entities.Recipient>, IRecipientRepository
    {
        public RecipientRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Recipient") : base(settings, tableName, mapper, log)
        { }

        public async Task<Models.Recipient> InsertOrReplaceAsync(Models.Recipient model)
        {
            var inserted = await InsertOrReplaceAsync(_mapper.Map<Entities.Recipient>(model));
            return _mapper.Map<Models.Recipient>(inserted);
        }

        public async Task<Models.Recipient> DeleteAsync(Models.Recipient model)
        {
            var deleted = await DeleteAsync(_mapper.Map<Entities.Recipient>(model));
            return _mapper.Map<Models.Recipient>(deleted);
        }
        public async Task<Models.Recipient> GetUnmatchedRecipientsAsync( string location, string currentEvent )
        {
            var query = new TableQuery<Entities.Recipient>() { FilterString = 
                TableQuery.CombineFilters(
                    TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, $"{currentEvent}_{location}"), 
                    TableOperators.And, 
                    TableQuery.GenerateFilterConditionForBool("IsMatched", QueryComparisons.Equal, false))
            };

            var recipients = await GetAllByQueryAsync(query);
            return _mapper.Map<Models.Recipient>(recipients);
        }
}}
