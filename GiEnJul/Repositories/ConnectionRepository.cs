using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Repositories
{
    public interface IConnectionRepository
    {
        Task<(string, string)> InsertOrReplaceAsync(Models.Giver giver, Models.Recipient recipient);
        Task DeleteConnectionAsync(string partitionKey, string rowKey);
        Task<IEnumerable<Connection>> GetAllByLocationEventAsync(string location, string eventName);
        Task<IEnumerable<(Models.Giver, Models.Recipient)>> GetAllConnectionsByLocation(string eventName,string location);
    }
    public class ConnectionRepository : GenericRepository<Connection>, IConnectionRepository
    {
        public ConnectionRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Connection") : base(settings, tableName, mapper, log)
        { }

        public async Task<(string, string)> InsertOrReplaceAsync(Models.Giver giver, Models.Recipient recipient)
        {
            var connection = new Connection(_mapper.Map<Giver>(giver), _mapper.Map<Recipient>(recipient));
            await InsertOrReplaceAsync(connection);
            return (connection.PartitionKey, connection.RowKey);
        }

        public async Task DeleteConnectionAsync(string partitionKey, string rowKey)
        {
            await DeleteAsync(partitionKey, rowKey);
        }

        public async Task<IEnumerable<Connection>> GetAllByLocationEventAsync(string location, string eventName)
        {
            var query = new TableQuery<Entities.Connection>()
            {
                FilterString =
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, $"{eventName}_{location}")
            };
            return await GetAllByQueryAsync(query);
        }

        public async Task<IEnumerable<(Models.Giver, Models.Recipient)>> GetAllConnectionsByLocation(string eventName, string location)
        {
            var query = new TableQuery<Entities.Connection>()
            {
                FilterString = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, $"{eventName}_{location}")
            };
            var connections = await GetAllByQueryAsync(query);

            var GiverRecipientTuples = new List<(Models.Giver, Models.Recipient)>();
            foreach (var conn in connections)
            {
                GiverRecipientTuples.Add((
                    _mapper.Map<Models.Giver>(conn),
                    _mapper.Map<Models.Recipient>(conn)
                    ));
            }
            return GiverRecipientTuples;
        }
    }
}