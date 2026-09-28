using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using GiEnJul.Models.Mappers;
using Serilog;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Repositories;

public interface IPersonRepository
{
    Task<Person?> DeleteAsync(Models.Person model);
    Task<int> DeleteBatchAsync(IEnumerable<Models.Person> models);
    Task<Person> InsertOrReplaceAsync(Models.Person model);
    Task<int> InsertOrReplaceBatchAsync(IEnumerable<Models.Person> models);
    Task<List<Models.Person>> GetAllByRecipientId(string partitionKey);
    Task<IEnumerable<Models.Person>> GetAllByRecipientIds(IEnumerable<string> recipientIds);
    Task<Models.Person?> GetPersonById(string personId);

}

public class PersonRepository : GenericRepository<Person>, IPersonRepository
{
    public PersonRepository(ISettings settings, ILogger log, string tableName = "Person") : base(settings, tableName, log)
    { }

    public async Task<Person> InsertOrReplaceAsync(Models.Person model)
    {
        return await InsertOrReplaceAsync(model.ToEntity());
    }
    public async Task<int> InsertOrReplaceBatchAsync(IEnumerable<Models.Person> models)
    {
        return await InsertOrReplaceBatchAsync(models.Select(m => m.ToEntity()));
    }

    public async Task<Person?> DeleteAsync(Models.Person model)
    {
        return await DeleteAsync(model.ToEntity());
    }

    public async Task<int> DeleteBatchAsync(IEnumerable<Models.Person> models)
    {
        return await DeleteBatchAsync(models.Select(m => m.ToEntity()));
    }

    public async Task<List<Models.Person>> GetAllByRecipientId(string partitionKey)
    {
        var query = $"PartitionKey eq '{partitionKey}'";
        var persons = await GetAllByQueryAsync(query);
        return persons.Select(m => m.ToModel()).ToList();
    }

    public async Task<Models.Person?> GetPersonById(string rowKey)
    {
        var query = $"RowKey eq '{rowKey}'";

        var persons = await GetAllByQueryAsync(query);
        return persons.FirstOrDefault()?.ToModel();
    }

    public async Task<IEnumerable<Models.Person>> GetAllByRecipientIds(IEnumerable<string> recipientIds)
    {
        var result = await GetAllByPartitionKey(recipientIds);
        return result.Select(e => e.ToModel());
    }
}
