using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using Azure.Data.Tables;
using Azure;
using Azure.Core;

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
                var result = await GetAsync(name, tableName);

                if (result == null && attempts == 1)
                {
                    result = await InsertOrReplaceAsync(new AutoIncrement(name, tableName));
                }
                else
                {
                    result.Value += 1;
                }

                _httpClient.DefaultRequestHeaders.Add("If-Match", result.ETag.ToString());

                try
                {
                    await InsertOrReplaceAsync(result);
                    return result.Value.ToString();
                }
                catch (RequestFailedException e)
                {
                    attempts += 1;
                    if (e.Status != 412 || attempts > 3)
                    {
                        throw e;
                    }
                    await Task.Delay(50);
                }
                finally
                {
                    _httpClient.DefaultRequestHeaders.Remove("If-Match");
                }
            }
        }

        public class IfMatchPolicy : Azure.Core.Pipeline.HttpPipelineSynchronousPolicy
        {
            public IfMatchPolicy(ETag etag)
            {
                Etag = etag;
            }

            public ETag Etag { get; }

            public override void OnSendingRequest(HttpMessage message)
            {
                message.Request.Headers.Add("If-Match", Etag.ToString());
                base.OnSendingRequest(message);
            }
        }
    }
}
