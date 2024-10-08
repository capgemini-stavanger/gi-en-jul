﻿using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Repositories
{

    public interface ICmsRepository
    {
        Task<IEnumerable<Models.Cms>> GetCmsByContentTypeAsync(string contentType);
        Task<Models.Cms> InsertOrReplaceAsync(Models.Cms cms);
        Task<Models.Cms> GetSingleCmsByContentTypeAsync(string contentType, string index);
        Task<Entities.Cms> DeleteEntry(string contentType, string index);
    }

    public class CmsRepository : GenericRepository<Cms>, ICmsRepository
    {
        private readonly IMapper _mapper;

        public CmsRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Cms") : base(settings, tableName, mapper, log)
        {
            _mapper = mapper;
        }

        public async Task<Models.Cms> GetSingleCmsByContentTypeAsync(string contentType, string index)
        {
            var query = $"PartitionKey eq '{contentType}' and RowKey eq '{index}' ";
            var matches = await GetAllByQueryAsync(query);
            var mappedResponse = _mapper.Map<Models.Cms>(matches.SingleOrDefault());
            return mappedResponse;
        }

        public async Task<IEnumerable<Models.Cms>> GetCmsByContentTypeAsync(string contentType)
        {
            var partitionKeyFiler = $"PartitionKey eq '{contentType}'";
            var cmsContent = await GetAllByQueryAsync(partitionKeyFiler);
            return _mapper.Map<IEnumerable<Models.Cms>>(cmsContent);
        }

        public async Task<Models.Cms> InsertOrReplaceAsync(Models.Cms cms)
        {
            var inserted = await InsertOrReplaceAsync(_mapper.Map<Cms>(cms));
            return _mapper.Map<Models.Cms>(inserted);
        }

        public async Task<Entities.Cms> DeleteEntry(string contentType, string index)
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
}
