using AutoMapper;
using GiEnJul.Infrastructure;
using System.Threading.Tasks;
using GiEnJul.Entities;
using Serilog;
using Microsoft.Azure.Cosmos.Table;
using System.Collections.Generic;

namespace GiEnJul.Features
{
    public interface IPersonRepository : IGenericRepository<Person>
    {
        Task<Person> DeleteAsync(Models.Person model);
        Task<TableBatchResult> DeleteBatchAsync(List<Models.Person> models);
        Task<Person> InsertOrReplaceAsync(Models.Person model);
        Task<TableBatchResult> InsertOrReplaceBatchAsync(List<Models.Person> models);
    }

    public class PersonRepository : GenericRepository<Person>, IPersonRepository
    {
        public PersonRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Person") : base(settings, tableName, mapper, log)
        { }

        public async Task<Person> InsertOrReplaceAsync(Models.Person model)
        {
            return await InsertOrReplaceAsync(_mapper.Map<Person>(model));
        }
        public async Task<TableBatchResult> InsertOrReplaceBatchAsync(List<Models.Person> models)
        {
            return await InsertOrReplaceBatchAsync(_mapper.Map<List<Person>>(models));
        }

        public async Task<Person> DeleteAsync(Models.Person model)
        {
            return await DeleteAsync(_mapper.Map<Person>(model));
        }

        public async Task<TableBatchResult> DeleteBatchAsync(List<Models.Person> models)
        {
            return await DeleteBatchAsync(_mapper.Map<List<Person>>(models));
        }
    }
}
