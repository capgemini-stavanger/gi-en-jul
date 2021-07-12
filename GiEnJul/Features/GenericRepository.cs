using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public class GenericRepository<T> where T : EntityBase, new()
    {
        private CloudTable _table { get; set; }
        protected IMapper _mapper { get; set; }
        protected ILogger _log { get; set; }

        protected GenericRepository(ISettings settings, string tableName, IMapper mapper, ILogger log)
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

        protected async Task<T> DeleteAsync(T entity)
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

        protected async Task<T> DeleteAsync(string partitionKey, string rowKey)
        {
            var entity = await GetAsync(partitionKey, rowKey);

            return await DeleteAsync(entity);
        }

        protected async Task<TableBatchResult> DeleteBatchAsync(IEnumerable<T> entities)
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

        protected async Task<T> GetAsync(string partitionKey, string rowKey)
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

        protected async Task<T> InsertOrReplaceAsync(T entity)
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

        protected async Task<TableBatchResult> InsertOrReplaceBatchAsync(IEnumerable<T> entities)
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

        protected async Task<IEnumerable<T>> GetAllAsync()
        {
            return await GetAllByQueryAsync(new TableQuery<T>());
        }

        protected async Task<IEnumerable<T>> GetAllByQueryAsync(TableQuery<T> query)
        {
            try
            {
                _log.Verbose("Fetching entities in table:{0} with Query: {@query}", _table.Name, query.FilterString);

                TableContinuationToken token = null;
                var entities = new List<T>();

                do
                {
                    var queryResult = await _table.ExecuteQuerySegmentedAsync(query, token);
                    entities.AddRange(queryResult.Results);
                    token = queryResult.ContinuationToken;

                } while (token != null);

                _log.Debug("Fetched {0} entities in table:{1}", entities.Count, _table.Name);
                return entities;
            }
            catch (Exception e)
            {
                _log.Error("Exception while fetching entities, in table:{0}", _table.Name, e);
                throw;
            }
        }
    }
}
