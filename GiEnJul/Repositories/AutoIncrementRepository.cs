using AutoMapper;
using Azure;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using System;
using System.Threading.Tasks;

namespace GiEnJul.Repositories
{
    public interface IAutoIncrementRepository
    {
        Task<string> GetNext(string name, string tableName);
    }

    public class AutoIncrementRepository : GenericRepository<AutoIncrement>, IAutoIncrementRepository
    {
        public AutoIncrementRepository(
            ISettings settings, 
            IMapper mapper, 
            ILogger log, 
            string tableName = "AutoIncrement"
        ) : base(settings, tableName, mapper, log)
        { }


        public async Task<string> GetNext(string name, string tableName)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException($"'{nameof(name)}' cannot be null or empty.", nameof(name));
            }

            var attempts = 1;
            while (true) {
                AutoIncrement result = default;
                try
                {
                    result = await GetAsync(name, tableName);
                }
                catch (Exception e)
                {
                    if (!(e is RequestFailedException rfe && rfe.ErrorCode == "ResourceNotFound"))
                        throw;
                }

                if (result == null && attempts == 1)
                {
                    result = await InsertOrReplaceAsync(new AutoIncrement(name, tableName));
                    return result.Value.ToString();
                }
                else
                {
                    result.Value += 1;

                    if (await UpdateIfMatch(result))
                        return result.Value.ToString();
                    else
                    {
                        attempts += 1;
                        await Task.Delay(50);
                    }
                }
            }
        }
    }
}
