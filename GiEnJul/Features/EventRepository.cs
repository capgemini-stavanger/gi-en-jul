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
    public interface IEventRepository
    {
        Task<string> GetActiveEventForLocationAsync(string location);
        Task<string[]> GetLocationsWithActiveEventAsync();
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
                FilterString = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, location)
            }.Take(1);

            var activeEvent = await GetAllByQueryAsync(query);

            if (activeEvent == null || !activeEvent.Any())
            {
                throw new KeyNotFoundException();
            }
            _log.Debug("Found active event: {@0} for location: {1}", activeEvent.First().PartitionKey, location);

            return activeEvent.First().PartitionKey;
        }

        public async Task<string[]> GetLocationsWithActiveEventAsync()
        {
            var query = new TableQuery<Event>()
            {
                FilterString = TableQuery.CombineFilters(
                    TableQuery.GenerateFilterConditionForDate("StartDate", QueryComparisons.LessThan, DateTimeOffset.UtcNow),
                    TableOperators.And,
                    TableQuery.GenerateFilterConditionForDate("EndDate", QueryComparisons.GreaterThan, DateTimeOffset.UtcNow))
            };
            var events = await GetAllByQueryAsync(query);

            var locationArray = events.Select(x => x.RowKey).ToArray();
            Array.Sort(locationArray);
            return locationArray;
        }
    }
}
