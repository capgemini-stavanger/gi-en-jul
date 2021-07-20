using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IConnectionRepository
    {
        Task<Connection> InsertOrReplaceAsync(Models.Giver giver, Models.Recipient recipient);
        Task<Connection> DeleteConnectionAsync(Entities.Connection connection);
    }
    public class ConnectionRepository : GenericRepository<Connection>, IConnectionRepository
    {
        public ConnectionRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Connection") : base(settings, tableName, mapper, log)
        { }

        public async Task<Connection> InsertOrReplaceAsync(Models.Giver giver, Models.Recipient recipient)
        {
            var connection = new Connection(_mapper.Map<Giver>(giver), _mapper.Map<Recipient>(recipient));
            return await InsertOrReplaceAsync(connection);
        }

        public async Task<Connection> DeleteConnectionAsync(Entities.Connection connection)
        {
            return await DeleteAsync(connection);
        }
    }
}