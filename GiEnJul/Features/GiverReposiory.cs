using AutoMapper;
using GiEnJul.Infrastructure;
using Serilog;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IGiverRepository : IGenericRepository<Entities.Giver>
    {
        Task<Models.Giver> DeleteAsync(Models.Giver model);
        Task<Models.Giver> InsertOrReplaceAsync(Models.Giver model);
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
    }
}