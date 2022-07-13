using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;


namespace GiEnJul.Repositories
{
    public interface IMunicipalityRepository
    {
        Task<Entities.Municipality> DeleteEntry(string rowKey);
        Task<Models.Municipality> InsertOrReplaceAsync(Models.Municipality municipality);
        Task<IEnumerable<Entities.Municipality>> GetAll();
        Task<IEnumerable<Municipality>> GetAllActive();
    }

    public class MunicipalityRepository : GenericRepository<Municipality>, IMunicipalityRepository
    {
        public MunicipalityRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Municipality") : base(settings, tableName, mapper, log)
        { }

        public async Task<Municipality> DeleteEntry(string rowKey)
        {
            try
            {
                var all = (List<Municipality>)(await GetAll());
                var entity = all.Where(x => x.RowKey == rowKey).SingleOrDefault();
                var entry = await DeleteAsync(entity);
                return entry;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Models.Municipality> InsertOrReplaceAsync(Models.Municipality municipality)
        {
            var inserted = await InsertOrReplaceAsync(_mapper.Map<Municipality>(municipality));
            return _mapper.Map<Models.Municipality>(inserted);
        }

        public async Task<IEnumerable<Entities.Municipality>> GetAll()
        {
            return await GetAllAsync();
        }

        public async Task<IEnumerable<Municipality>> GetAllActive()
        {
            var all = await GetAllAsync();
            var active = all.Where(x => x.IsActive == true);
            return active;
        }
    }
}
