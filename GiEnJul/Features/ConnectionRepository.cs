using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IConnectionRepository
    {
        Task<(string,string)> InsertOrReplaceAsync(Models.Giver giver, Models.Recipient recipient);
        Task DeleteConnectionAsync(string partitionKey, string rowKey);
    }
    public class ConnectionRepository : GenericRepository<Connection>, IConnectionRepository
    {
        public ConnectionRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Connection") : base(settings, tableName, mapper, log)
        { }

        public async Task<(string,string)> InsertOrReplaceAsync(Models.Giver giver, Models.Recipient recipient)
        {
            var connection = new Connection(_mapper.Map<Giver>(giver), _mapper.Map<Recipient>(recipient));
            await InsertOrReplaceAsync(connection);
            return (connection.PartitionKey, connection.RowKey);
        }

        public async Task DeleteConnectionAsync(string partitionKey, string rowKey)
        {
            await DeleteAsync(partitionKey, rowKey);
        }
    }
}