using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Features
{
    public interface IEventRepository : IGenericRepository<Event>
    {
        Task<string> GetActiveEventForLocationAsync(string location);
    }

    public class EventRepository : GenericRepository<Event>, IEventRepository
    {
        public EventRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Event") : base(settings, tableName, mapper, log)
        { }


        public async Task<string> GetActiveEventForLocationAsync(string location)
        {
            if (string.IsNullOrEmpty(location))
            {
                throw new ArgumentException($"'{nameof(location)}' cannot be null or empty.", nameof(location));
            }

            var query = new TableQuery<Event>()
            {
                FilterString = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, location),
                TakeCount = 1
            };

            var activeEvent = await GetAllByQueryAsync(query);

            if (activeEvent == null || !activeEvent.Any())
            {
                throw new KeyNotFoundException();
            }
            _log.Debug("Found active event: {0} for location: {1}", activeEvent, location);

            return activeEvent.First().PartitionKey;
        }
    }
}
