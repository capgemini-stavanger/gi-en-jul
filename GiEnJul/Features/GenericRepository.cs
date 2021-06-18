using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IGenericRepository<T> where T : TableEntity
    {
        public CloudTable _table { get; }


        Task<T> GetAsync(string rowKey, string partitionKey); 
        Task<T> InsertOrReplaceAsync(T entity);
        Task<T> DeleteAsync(T entity);
    }

    public class GenericRepository<T> : IGenericRepository<T> where T : TableEntity
    {
        public CloudTable _table { get; private set; }

        public GenericRepository(ISettings settings, string tableName)
        {
            var storageAccount = CloudStorageAccount.Parse(settings.TableConnectionString);
            var tableClient = storageAccount.CreateCloudTableClient();

            _table = tableClient.GetTableReference(tableName);
            _table.CreateIfNotExists();
        }

        public async Task<T> DeleteAsync(T entity)
        {
            var operation = TableOperation.Delete(entity);
            var result = await _table.ExecuteAsync(operation);

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
            var operation = TableOperation.InsertOrReplace(entity);
            var result = await _table.ExecuteAsync(operation);

            return (T)result.Result;
        }
    }

}
