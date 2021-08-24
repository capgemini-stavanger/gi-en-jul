using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using Microsoft.Azure.Cosmos.Table;

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

            var context = new OperationContext()
            {
                UserHeaders = new Dictionary<string, string>()
            };

            var attempts = 1;
            while (true) {
                var result = await GetAsync(name, tableName);

                if (result == null && attempts == 1)
                {
                    result = await InsertOrReplaceAsync(new AutoIncrement(name, tableName));
                }
                else
                {
                    result.Value += 1;
                }

                context.UserHeaders["If-Match"] = result.ETag;

                try
                {
                    await InsertOrReplaceAsync(result, context);
                    return result.Value.ToString();
                }
                catch (StorageException e)
                {
                    attempts += 1;
                    if (e.RequestInformation.HttpStatusCode != 412 || attempts > 3)
                    {
                        throw e;
                    }
                    await Task.Delay(50);
                }
            }
        }
    }
}
