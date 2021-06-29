using AutoMapper;
using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IGenericRepository<T> where T : TableEntity
    {
        public CloudTable _table { get; }
        public IMapper _mapper { get; set; }
        public ILogger _log { get; set; }

        Task<T> GetAsync(string partitionKey, string rowKey);
        Task<T> InsertOrReplaceAsync(T entity);
        Task<TableBatchResult> InsertOrReplaceBatchAsync(IEnumerable<T> entities);
        Task<T> DeleteAsync(T entity);
        Task<T> DeleteAsync(string partitionKey, string rowKey);
        Task<TableBatchResult> DeleteBatchAsync(IEnumerable<T> entities);

#pragma warning disable CS0693 // Type parameter has the same name as the type parameter from outer type
        Task<IEnumerable<T>> GetAllAsync<T>() where T : ITableEntity, new();
        Task<IEnumerable<T>> GetAllByQueryAsync<T>(TableQuery<T> query) where T : ITableEntity, new();
#pragma warning restore CS0693 // Type parameter has the same name as the type parameter from outer type
    }

    public class GenericRepository<T> : IGenericRepository<T> where T : TableEntity
    {
        public CloudTable _table { get; private set; }
        public IMapper _mapper { get; set; }
        public ILogger _log { get; set; }

        public GenericRepository(ISettings settings, string tableName, IMapper mapper, ILogger log)
        {
            _mapper = mapper;
            _log = log;

            var storageAccount = CloudStorageAccount.Parse(settings.TableConnectionString);
            var tableClient = storageAccount.CreateCloudTableClient();
            tableClient.DefaultRequestOptions.RetryPolicy = new LinearRetry(TimeSpan.FromSeconds(1), 5);
            _table = tableClient.GetTableReference(tableName);

            try
            {
                _table.CreateIfNotExists();

            }
            catch (StorageException e)
            {
                _log.Fatal("Could not create or connect to Azure Table Storage.\n{@0}", e.ToString());
                throw e;
            }
        }

        public async Task<T> DeleteAsync(T entity)
        {
            try
            {
                _log.Verbose("Trying to delete Entity:{@entity} in table:{@tablename}.", entity, _table.Name);
                entity.ETag = "*";
                var operation = TableOperation.Delete(entity);
                var result = await _table.ExecuteAsync(operation);
                _log.Debug("Deleted Entity:{@entity}, in table:{@tablename}.", entity, _table.Name);

                return (T)result.Result;
            }
            catch (Exception e)
            {
                _log.Error("Exception while trying to delete Entity:{@entity}, in table:{@tablename}. \n{@Exception}", entity, _table.Name, e);
                throw e;
            }
        }

        public async Task<T> DeleteAsync(string partitionKey, string rowKey)
        {
            var entity = await GetAsync(partitionKey, rowKey);

            return await DeleteAsync(entity);
        }

        public async Task<TableBatchResult> DeleteBatchAsync(IEnumerable<T> entities)
        {
            var batchOperation = new TableBatchOperation();
            try
            {
                _log.Verbose("Trying to delete multiple entities, in table:{@tablename}", _table.Name);
                foreach (var entity in entities)
                {
                    batchOperation.Delete(entity);
                }
                var result = await _table.ExecuteBatchAsync(batchOperation);
                _log.Debug("Deleted multiple entities, in table:{@tablename}", _table.Name);
                return result;
            }
            catch (Exception e)
            {
                _log.Error("Exception occurred while trying to delete multiple entities, in table:{0}. \n{@Exception}", _table.Name, e);
                throw e;
            }
        }

        public async Task<T> GetAsync(string partitionKey, string rowKey)
        {
            try
            {
                _log.Verbose("Trying to find row with RowKey:{@rowKey}, and PartitionKey:{@partitionKey}, in table:{@tablename}.", rowKey, partitionKey, _table.Name);
                var operation = TableOperation.Retrieve<T>(partitionKey, rowKey);
                var result = await _table.ExecuteAsync(operation);
                _log.Debug("Found entity {@entity}, in table:{@tablename}.", result.Result, _table.Name);

                return (T)result.Result;
            }
            catch (Exception e)
            {
                _log.Error("Exception while trying to fetch row with RowKey:{@rowKey}, and PartitionKey:{@partitionKey}, in table:{@tablename}. \n{@Exception}", rowKey, partitionKey, _table.Name, e);
                throw e;
            }
        }

        public async Task<T> InsertOrReplaceAsync(T entity)
        {
            try
            {
                _log.Verbose("Trying to add Entity:{@entity}, into table:{@tablename}", entity, _table.Name);
                var operation = TableOperation.InsertOrReplace(entity);
                var result = await _table.ExecuteAsync(operation);
                _log.Debug("Added Entity:{@entity}, into table:{@tablename}", entity, _table.Name);

                return (T)result.Result;
            }
            catch (Exception e)
            {
                _log.Error("Exception while trying to add or update Entity:{@entity}, into table:{@tablename}. \n{@Exception}", entity, _table.Name, e);
                throw e;
            }
        }

        public async Task<TableBatchResult> InsertOrReplaceBatchAsync(IEnumerable<T> entities)
        {
            var batchOperation = new TableBatchOperation();
            try
            {
                _log.Verbose("Trying to add multiple entities, into table:{@tablename}", _table.Name);
                foreach (var entity in entities)
                {
                    batchOperation.InsertOrReplace(entity);
                }
                var result = await _table.ExecuteBatchAsync(batchOperation);
                _log.Debug("Added multiple entities, into table:{@tablename}", _table.Name);
                return result;
            }
            catch (Exception e)
            {
                _log.Error("Exception while trying to add or update multiple entities, into table:{0}. \n{@Exception}", _table.Name, e);
                throw e;
            }
        }


#pragma warning disable CS0693 // Type parameter has the same name as the type parameter from outer type
        public async Task<IEnumerable<T>> GetAllAsync<T>() where T : ITableEntity, new()
#pragma warning restore CS0693 // Type parameter has the same name as the type parameter from outer type
        {
            return await GetAllByQueryAsync(new TableQuery<T>());
        }


#pragma warning disable CS0693 // Type parameter has the same name as the type parameter from outer type
        public async Task<IEnumerable<T>> GetAllByQueryAsync<T>(TableQuery<T> query) where T : ITableEntity, new()
#pragma warning restore CS0693 // Type parameter has the same name as the type parameter from outer type
        {
            try
            {
                _log.Verbose("Fetching entities in table:{0} with Query: {@query}", _table.Name, query.FilterString);

                TableContinuationToken token = null;
                var entities = new List<T>();

                do
                {
                    TableQuerySegment<T> queryResult = await _table.ExecuteQuerySegmentedAsync(query, token);
                    entities.AddRange(queryResult.Results);
                    token = queryResult.ContinuationToken;

                } while (token != null);

                _log.Debug("Fetched {0} entities in table:{1}", entities.Count, _table.Name);

                return entities;
            }
            catch (Exception e)
            {
                _log.Error("Exception while fetching entities, in table:{0}. \n{@Exception}", _table.Name, e);
                throw;
            }
        }

    }

}
