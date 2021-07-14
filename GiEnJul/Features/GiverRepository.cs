using AutoMapper;
using GiEnJul.Infrastructure;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IGiverRepository
    {
        Task<Models.Giver> DeleteAsync(Models.Giver model);
        Task<Models.Giver> InsertOrReplaceAsync(Models.Giver model);
        Task<IEnumerable<Models.Giver>> GetAllAsModelAsync();
        Task<Models.Giver> GetGiverAsync(string partitionKey, string rowKey);
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
        
    }
}