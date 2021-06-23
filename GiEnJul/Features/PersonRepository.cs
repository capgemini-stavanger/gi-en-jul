﻿using AutoMapper;
using GiEnJul.Infrastructure;
using System.Threading.Tasks;
using GiEnJul.Entities;
using Serilog;

namespace GiEnJul.Features
{
    public interface IPersonRepository : IGenericRepository<Person>
    {
        Task<Person> DeleteAsync(Models.Person model);
        Task<Person> InsertOrReplaceAsync(Models.Person model);
    }

    public class PersonRepository : GenericRepository<Person>, IPersonRepository
    {
        public PersonRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Person") : base(settings, tableName, mapper, log)
        { }

        public async Task<Person> InsertOrReplaceAsync(Models.Person model)
        {
            return await InsertOrReplaceAsync(_mapper.Map<Person>(model));
        }

        public async Task<Person> DeleteAsync(Models.Person model)
        {
            return await DeleteAsync(_mapper.Map<Person>(model));
        }
    }
}
