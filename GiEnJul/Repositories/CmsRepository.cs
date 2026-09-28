using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using GiEnJul.Models.Mappers;
using Serilog;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Repositories;


public interface ICmsRepository
{
    Task<IEnumerable<Models.Cms>> GetCmsByContentTypeAsync(string contentType);
    Task<Models.Cms> InsertOrReplaceAsync(Models.Cms cms);
    Task<Models.Cms?> GetSingleCmsByContentTypeAsync(string contentType, string index);
    Task<Entities.Cms?> DeleteEntry(string contentType, string index);
}

public class CmsRepository : GenericRepository<Cms>, ICmsRepository
{
    public CmsRepository(ISettings settings, ILogger log, string tableName = "Cms") : base(settings, tableName, log)
    {
    }

    public async Task<Models.Cms?> GetSingleCmsByContentTypeAsync(string contentType, string index)
    {
        var query = $"PartitionKey eq '{contentType}' and RowKey eq '{index}' ";
        var matches = await GetAllByQueryAsync(query);
        var mappedResponse = matches.SingleOrDefault()?.ToModel();
        return mappedResponse;
    }

    public async Task<IEnumerable<Models.Cms>> GetCmsByContentTypeAsync(string contentType)
    {
        var partitionKeyFiler = $"PartitionKey eq '{contentType}'";
        var cmsContent = await GetAllByQueryAsync(partitionKeyFiler);
        return cmsContent.Select(c => c.ToModel());
    }

    public async Task<Models.Cms> InsertOrReplaceAsync(Models.Cms cms)
    {
        var inserted = await InsertOrReplaceAsync(cms.ToEntity());
        return inserted.ToModel();
    }

    public async Task<Entities.Cms?> DeleteEntry(string contentType, string index)
    {
        try
        {
            var deleted = await DeleteAsync(contentType, index);
            return deleted;
        }
        catch 
        { 
            return null;
        }
    }
}
