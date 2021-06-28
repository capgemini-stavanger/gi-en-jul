using AutoMapper;
using GiEnJul.Infrastructure;
using Serilog;
using System.Threading.Tasks;
using GiEnJul.Entities;


namespace GiEnJul.Features
{
    public interface IConnectionRepository : IGenericRepository<Connection>
    {
        Task<Connection> InsertOrReplaceAsync(Models.Giver giver);
        Task<Connection> InsertOrReplaceAsync (Models.Recipient recipient);

    }

    public class ConnectionRepository : GenericRepository<Connection>, IConnectionRepository
    {
        public ConnectionRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Connection") : base(settings, tableName, mapper, log)
        { }

        public async Task<Connection> InsertOrReplaceAsync(Models.Giver giver)
        {
                return await InsertOrReplaceAsync(_mapper.Map<Connection>(giver));
        }
        public async Task<Connection> InsertOrReplaceAsync(Models.Recipient recipient)
        {
                return await InsertOrReplaceAsync(_mapper.Map<Connection>(recipient));
        }
    }
}