using AutoMapper;
using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IGenericRepository<T> where T : TableEntity
    {
        public CloudTable _table { get; }
        public IMapper _mapper { get; set; }


        Task<T> GetAsync(string rowKey, string partitionKey); 
        Task<T> InsertOrReplaceAsync(T entity);
        Task<T> DeleteAsync(T entity);
    }

    public class GenericRepository<T> : IGenericRepository<T> where T : TableEntity
    {
        public CloudTable _table { get; private set; }
        public IMapper _mapper { get; set; }

        public GenericRepository(ISettings settings, string tableName, IMapper mapper)
        {
            var storageAccount = CloudStorageAccount.Parse(settings.TableConnectionString);
            var tableClient = storageAccount.CreateCloudTableClient();

            _table = tableClient.GetTableReference(tableName);
            _table.CreateIfNotExists();

            _mapper = mapper;
        }

        public async Task<T> DeleteAsync(T entity)
        {
            var operation = TableOperation.Delete(entity);
            var result = await _table.ExecuteAsync(operation);

            return (T)result.Result;

        }

        public async Task<T> DeleteAsync(string rowKey, string partitionKey)
        {
            var operation = TableOperation.Retrieve(rowKey, partitionKey);
            var result = await _table.ExecuteAsync(operation);

            //Er dette greit
            await DeleteAsync((T)result.Result);

            return (T)result.Result;
        }

        public async Task<T> GetAsync(string rowKey, string partitionKey)
        {
            var operation = TableOperation.Retrieve(partitionKey, rowKey);
            var result = await _table.ExecuteAsync(operation);

            return (T)result.Result;
        }

        public async Task<T> InsertOrReplaceAsync(T entity)
        {
            //entity må konverteres fra Model til Entity her
            //eller være ferdig konvertert hit

            var operation = TableOperation.InsertOrReplace(entity);
            var result = await _table.ExecuteAsync(operation);

            return (T)result.Result;
        }
    }

}
