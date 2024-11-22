using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using GiEnJul.Models.Mappers;
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
        Task<IEnumerable<(Models.Giver, Models.Recipient)>> GetAllConnectionsByLocation(string eventName, string location);
        bool ConnectionExists(Models.Giver giver, Models.Recipient recipient);
    }
    public class ConnectionRepository : GenericRepository<Connection>, IConnectionRepository
    {
        public ConnectionRepository(ISettings settings, ILogger log, string tableName = "Connection") : base(settings, tableName, log)
        { }

        public async Task<(string, string)> InsertOrReplaceAsync(Models.Giver giver, Models.Recipient recipient)
        {
            var connection = new Connection(giver.ToEntity(), recipient.ToEntity());
            await InsertOrReplaceAsync(connection);
            return (connection.PartitionKey, connection.RowKey);
        }

        public async Task DeleteConnectionAsync(string partitionKey, string rowKey)
        {
            await DeleteAsync(partitionKey, rowKey);
        }

        public async Task<IEnumerable<Connection>> GetAllByLocationEventAsync(string location, string eventName)
        {
            var query = $"PartitionKey eq '{eventName}_{location}'";

            return await GetAllByQueryAsync(query);
        }

        public async Task<IEnumerable<(Models.Giver, Models.Recipient)>> GetAllConnectionsByLocation(string eventName, string location)
        {
            var query = $"PartitionKey eq '{eventName}_{location}'";

            var connections = await GetAllByQueryAsync(query);

            var GiverRecipientTuples = new List<(Models.Giver, Models.Recipient)>();
            foreach (var conn in connections)
            {
                GiverRecipientTuples.Add((
                    conn.ToGiver(),
                    conn.ToRecipient()
                    ));
            }
            return GiverRecipientTuples;
        }
        public bool ConnectionExists(Models.Giver giver, Models.Recipient recipient)
        {
            return TryGet(giver.Event, $"{recipient.RecipientId}_{giver.GiverId}", out _);
        }
    }
}