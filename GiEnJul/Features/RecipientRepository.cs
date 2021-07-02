using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IRecipientRepository : IGenericRepository<Recipient>
    {
        Task<Recipient> DeleteAsync(Models.Recipient model);
        Task<Recipient> InsertOrReplaceAsync(Models.Recipient model);
    }

    public class RecipientRepository : GenericRepository<Recipient>, IRecipientRepository
    {
        public RecipientRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Recipient") : base(settings, tableName, mapper, log)
        { }

        public async Task<Recipient> InsertOrReplaceAsync(Models.Recipient model)
        {
            return await InsertOrReplaceAsync(_mapper.Map<Recipient>(model));
        }

        public async Task<Recipient> DeleteAsync(Models.Recipient model)
        {
            return await DeleteAsync(_mapper.Map<Recipient>(model));
        }
    }
}
