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
        Task<Models.Municipality> GetSingle(string municipality, string country = "Norge");
        Task<bool> UpdateMunicipality(Models.Municipality municipality);
        Task<string> GetEmailByLocation(string location);

    }

    public class MunicipalityRepository : GenericRepository<Municipality>, IMunicipalityRepository
    {
        public MunicipalityRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Municipality") : base(settings, tableName, mapper, log)
        { }

        public async Task<Municipality> DeleteEntry(Models.Municipality municipality)
        {
            try
            {
                var response = await DeleteAsync(municipality.Country, municipality.Name);
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

        public async Task<Models.Municipality> GetSingle(string municipality, string country = "Norge")
        {
            var query = $"PartitionKey eq '{country}' and RowKey eq '{municipality}' ";
            var singleMunicipality = await GetAsync(country, municipality);
            return _mapper.Map<Models.Municipality>(singleMunicipality);
           /* var entetitiesMuni  = await GetAllByQueryAsync(query);
            var modelsMuni = _mapper.Map<List<Models.Municipality>>(entetitiesMuni);
            return modelsMuni;*/
        }
        public async Task<bool> UpdateMunicipality(Models.Municipality municipality)
        {
            var entityMunicipality = _mapper.Map<Entities.Municipality>(municipality);

            var query = $"PartitionKey eq '{entityMunicipality.PartitionKey}' and RowKey eq '{entityMunicipality.RowKey}' ";
            var matches = await GetAllByQueryAsync(query);
            if (matches.Count() != 1)  // either no matches, or multiple matches
            {
                return false;
            }
            await InsertOrReplaceAsync(municipality);
            return true;
        }
        public async Task<string> GetEmailByLocation(string location)
        {
            var query = $"RowKey eq '{location}' ";
            var municipalities = await GetAllByQueryAsync(query);
            var municipalityMatch = municipalities.FirstOrDefault(); _mapper.Map<Models.Municipality>(municipalities.FirstOrDefault());
            if (municipalityMatch == null)
            {
                return null;
            }

            return municipalityMatch.Email;
        }
    }
}
