using AutoMapper;
using GiEnJul.Infrastructure;
using System.Threading.Tasks;
using GiEnJul.Entities;
using Serilog;

namespace GiEnJul.Features
{
    public interface IGiverRepository : IGenericRepository<Giver>
    {
        Task<Giver> DeleteAsync(Models.Giver model);
        Task<Giver> InsertOrReplaceAsync(Models.Giver model);
    }

    public class GiverRepository : GenericRepository<Giver>, IGiverRepository
    {
        public GiverRepository(ISettings settings, IMapper mapper, ILogger logger,string tableName = "Giver") : base(settings, tableName, mapper, logger)
        { }

        public async Task<Giver> DeleteAsync(Models.Giver model)
        {
            return await DeleteAsync(_mapper.Map<Giver>(model));
        }

        public async Task<Giver> InsertOrReplaceAsync(Models.Giver model)
        {
            return await InsertOrReplaceAsync(_mapper.Map<Giver>(model));
        }
    }
}