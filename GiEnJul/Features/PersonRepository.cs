﻿using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IPersonRepository : IGenericRepository<Person>
    {
        Task<Person> DeleteAsync(Models.Person model);
        Task<TableBatchResult> DeleteBatchAsync(IEnumerable<Models.Person> models);
        Task<Person> InsertOrReplaceAsync(Models.Person model);
        Task<TableBatchResult> InsertOrReplaceBatchAsync(IEnumerable<Models.Person> models);
    }

    public class PersonRepository : GenericRepository<Person>, IPersonRepository
    {
        public PersonRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Person") : base(settings, tableName, mapper, log)
        { }

        public async Task<Person> InsertOrReplaceAsync(Models.Person model)
        {
            return await InsertOrReplaceAsync(_mapper.Map<Person>(model));
        }
        public async Task<TableBatchResult> InsertOrReplaceBatchAsync(IEnumerable<Models.Person> models)
        {
            return await InsertOrReplaceBatchAsync(_mapper.Map<IEnumerable<Person>>(models));
        }

        public async Task<Person> DeleteAsync(Models.Person model)
        {
            return await DeleteAsync(_mapper.Map<Person>(model));
        }

        public async Task<TableBatchResult> DeleteBatchAsync(IEnumerable<Models.Person> models)
        {
            return await DeleteBatchAsync(_mapper.Map<IEnumerable<Person>>(models));
        }
    }
}
