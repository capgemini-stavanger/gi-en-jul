using AutoMapper;
using GiEnJul.Infrastructure;
using Serilog;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IRecipientRepository
    {
        Task<Models.Recipient> DeleteAsync(Models.Recipient model);
        Task<Models.Recipient> InsertOrReplaceAsync(Models.Recipient model);
    }

    public class RecipientRepository : GenericRepository<Entities.Recipient>, IRecipientRepository
    {
        public RecipientRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Recipient") : base(settings, tableName, mapper, log)
        { }

        public async Task<Models.Recipient> InsertOrReplaceAsync(Models.Recipient model)
        {
            var inserted = await InsertOrReplaceAsync(_mapper.Map<Entities.Recipient>(model));
            return _mapper.Map<Models.Recipient>(inserted);
        }

        public async Task<Models.Recipient> DeleteAsync(Models.Recipient model)
        {
            var deleted = await DeleteAsync(_mapper.Map<Entities.Recipient>(model));
            return _mapper.Map<Models.Recipient>(deleted);
        }
    }
}
