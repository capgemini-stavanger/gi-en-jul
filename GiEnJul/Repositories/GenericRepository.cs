using AutoMapper;
using Azure;
using Azure.Core.Pipeline;
using Azure.Data.Tables;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace GiEnJul.Repositories
{
    public class GenericRepository<T> where T : EntityBase, new()
    {
        protected readonly ISettings _settings;

        private TableClient _client { get; set; }

        protected IMapper _mapper { get; set; }
        protected ILogger _log { get; set; }

        protected GenericRepository(ISettings settings, string tableName, IMapper mapper, ILogger log)
        {
            _settings = settings;
            _mapper = mapper;
            _log = log;

            var tableClient = new TableClient(settings.TableConnectionString, tableName);
            _client = tableClient;

            try
            {
                tableClient.CreateIfNotExists();
            }
            catch (Exception e)
            {
                _log.Fatal(e, "Could not create or connect to Azure Table Storage");
                throw;
            }
        }

        protected async Task<T> DeleteAsync(T entity)
        {
            try
            {
                _log.Verbose("Trying to delete Entity:{@entity} in table:{@tablename}.", entity, _client.Name);
                entity.ETag = new Azure.ETag("*");
                var result = await _client.DeleteEntityAsync(entity.PartitionKey, entity.RowKey);
                _log.Debug("Deleted Entity:{@entity}, in table:{@tablename}.", entity, _client.Name);

                if (!result.IsError)
                    return entity;
                return null;
            }
            catch (Exception e)
            {
                _log.Error(e, "Exception while trying to delete Entity:{@entity}, in table:{@tablename}", entity, _client.Name);
                throw;
            }
        }

        protected async Task<T> DeleteAsync(string partitionKey, string rowKey)
        {
            var entity = await GetAsync(partitionKey, rowKey);

            return await DeleteAsync(entity);
        }

        protected async Task<int> DeleteBatchAsync(IEnumerable<ITableEntity> entities)
        {
            var batchOperation = new List<TableTransactionAction>();
            try
            {
                _log.Verbose("Trying to delete multiple entities, in table:{@tablename}", _client.Name);
                foreach (var entity in entities)
                {
                    batchOperation.Add(new TableTransactionAction(TableTransactionActionType.Delete, entity));
                }
                var result = await _client.SubmitTransactionAsync(batchOperation);
                _log.Debug("Deleted multiple entities, in table:{@tablename}", _client.Name);
                return result.Value.Where(r => r.IsError).Count();
            }
            catch (Exception e)
            {
                _log.Error(e, "Exception occurred while trying to delete multiple entities, in table:{0}", _client.Name);
                throw;
            }
        }

        protected async Task<T> GetAsync(string partitionKey, string rowKey)
        {
            try
            {
                _log.Verbose("Trying to find row with RowKey:{@rowKey}, and PartitionKey:{@partitionKey}, in table:{@tablename}.", rowKey, partitionKey, _client.Name);
                var result = await _client.GetEntityAsync<T>(partitionKey, rowKey);
                _log.Debug("Found entity {@entity}, in table:{@tablename}.", result.Value, _client.Name);

                return result.Value;
            }
            catch (Exception e)
            {
                _log.Error(e,  "Exception while trying to fetch row with RowKey:{@rowKey}, and PartitionKey:{@partitionKey}, in table:{@tablename}", rowKey, partitionKey, _client.Name);
                throw;
            }
        }
        
        protected bool TryGet(string partitionKey, string rowKey, out T result)
        {
            result = null;
            try
            {
                result = GetAsync(partitionKey, rowKey).Result;
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        protected async Task<T> InsertOrReplaceAsync(T entity)
        {
            try
            {
                _log.Verbose("Trying to add Entity:{@entity}, into table:{@tablename}", entity, _client.Name);
                var result = await _client.UpsertEntityAsync(entity);
                _log.Debug("Added Entity:{@entity}, into table:{@tablename}", entity, _client.Name);

                if (!result.IsError)
                    return entity;
                return null;
            }
            catch (Exception e)
            {
                _log.Error(e,  "Exception while trying to add or update Entity:{@entity}, into table:{@tablename}", entity, _client.Name);
                throw;
            }
        }

        /// <summary>
        /// Update the entity if the etag matches
        /// </summary>
        /// <param name="entity">entity to update</param>
        /// <returns>true if success, otherwise false</returns>
        protected async Task<bool> UpdateIfMatch(T entity)
        {
            try
            {
                var result = await _client.UpdateEntityAsync(entity, entity.ETag);
                return true;
            }
            catch (RequestFailedException e)
            {
                _log.Debug("{@0}", e);
                return false;
            }
        }

        protected async Task<int> InsertOrReplaceBatchAsync(IEnumerable<T> entities)
        {
            var batchOperation = new List<TableTransactionAction>();
            try
            {
                _log.Verbose("Trying to add multiple entities, into table:{@tablename}", _client.Name);
                foreach (var entity in entities)
                {
                    batchOperation.Add(new TableTransactionAction(TableTransactionActionType.UpsertReplace, entity));
                }
                var result = await _client.SubmitTransactionAsync(batchOperation);
                _log.Debug("Added multiple entities, into table:{@tablename}", _client.Name);
                return result.Value.Count(r => !r.IsError);
            }
            catch (Exception e)
            {
                _log.Error(e,  "Exception while trying to add or update multiple entities, into table:{0}", _client.Name);
                throw;
            }
        }

        protected async Task<IEnumerable<T>> GetAllAsync()
        {
            try
            {
                var entities = new List<T>();
                var queryResult = _client.QueryAsync<T>(t => true);
                await foreach (var item in queryResult)
                {
                    entities.Add(item);
                }

                _log.Debug("Fetched {0} entities in table:{1}", entities.Count, _client.Name);
                return entities;
            }
            catch (Exception e)
            {
                _log.Error(e,  "Exception while fetching entities, in table:{0}", _client.Name);
                throw;
            }
        }


        protected async Task<IEnumerable<T>> GetAllByQueryAsync(string query)
        {
            try
            {
                _log.Verbose("Fetching entities in table:{0} with Query: {@query}", _client.Name, query);

                var entities = new List<T>();
                var queryResult = _client.QueryAsync<T>(query);

                await foreach (var item in queryResult)
                {
                    entities.Add(item);
                }

                _log.Debug("Fetched {0} entities in table:{1}", entities.Count, _client.Name);
                return entities;
            }
            catch (Exception e)
            {
                _log.Error(e,  "Exception while fetching entities, in table:{0}", _client.Name);
                throw;
            }
        }
    }
}
