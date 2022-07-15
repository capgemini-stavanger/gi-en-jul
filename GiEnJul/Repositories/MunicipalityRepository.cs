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
        Task<Entities.Municipality> DeleteEntry(Models.Municipality municipality);
        Task<Models.Municipality> InsertOrReplaceAsync(Models.Municipality municipality);
        Task<IEnumerable<Municipality>> GetAll();
      
    }

    public class MunicipalityRepository : GenericRepository<Municipality>, IMunicipalityRepository
    {
        public MunicipalityRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Municipality") : base(settings, tableName, mapper, log)
        { }

        public async Task<Municipality> DeleteEntry(Models.Municipality municipality)
        {
            try
            {
                var response= await DeleteAsync(municipality.Country, municipality.Name);
                return response;
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

        public async Task<IEnumerable<Municipality>> GetAll()
        {
            return await GetAllAsync();
        }
    }
}
