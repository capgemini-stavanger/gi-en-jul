using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Repositories
{
    public interface IEventRepository
    {
        Task<string> GetActiveEventForLocationAsync(string location);
        Task<string[]> GetLocationsWithActiveEventAsync();
        Task<List<Models.Event>> GetContactsWithActiveEventAsync();
        Task<string> GetDeliveryAddressForLocationAsync(string location);
        Task<Models.Event> InsertOrReplaceAsync(Models.Event model);
    }

    public class EventRepository : GenericRepository<Event>, IEventRepository
    {
        public EventRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Event") : base(settings, tableName, mapper, log)
        { }


        public async Task<string> GetActiveEventForLocationAsync(string location)
        {
            var eventByLocation = await GetEventByLocationAsync(location);
            return eventByLocation.PartitionKey;
        }

        public async Task<string> GetDeliveryAddressForLocationAsync(string location)
        {
            var evnt = await GetEventByLocationAsync(location);
            return evnt.DeliveryAddress;
        }

        private async Task<Event> GetEventByLocationAsync(string location)
        {
            if (string.IsNullOrEmpty(location))
            {
                throw new ArgumentException($"'{nameof(location)}' cannot be null or empty.", nameof(location));
            }

            // RowKey == location
            var rowKeyFilter = TableQuery.GenerateFilterCondition("RowKey", QueryComparisons.Equal, location);

            var query = new TableQuery<Event>().Where(
                TableQuery.CombineFilters(
                    rowKeyFilter,
                    TableOperators.And,
                    HasActiveDates()))
                .Take(1);

            var activeEvent = await GetAllByQueryAsync(query);

            if (activeEvent == null || !activeEvent.Any())
            {
                throw new KeyNotFoundException();
            }
            _log.Debug("Found active event: {@0} for location: {1}", activeEvent.First().PartitionKey, location);

            return activeEvent.First();
        }

        public async Task<string[]> GetLocationsWithActiveEventAsync()
        {
            var query = new TableQuery<Event>().Where(HasActiveDates());

            var events = await GetAllByQueryAsync(query);

            var locationArray = events.Select(x => x.RowKey).ToArray();
            Array.Sort(locationArray);
            return locationArray;
        }

        private string HasActiveDates()
        {
            // StartDate <= DateTime.Now
            var startDatePassed = TableQuery.GenerateFilterConditionForDate("StartDate", QueryComparisons.LessThanOrEqual, DateTime.Now);
            // EndDate >= DateTime.Now
            var endDateNotPassed = TableQuery.GenerateFilterConditionForDate("EndDate", QueryComparisons.GreaterThanOrEqual, DateTime.Now);

            return TableQuery.CombineFilters(startDatePassed, TableOperators.And, endDateNotPassed);
        }

        public async Task<Models.Event> InsertOrReplaceAsync(Models.Event model)
        {
            var inserted = await InsertOrReplaceAsync(_mapper.Map<Entities.Event>(model));
            return _mapper.Map<Models.Event>(inserted);
        }

        public async Task<List<Models.Event>> GetContactsWithActiveEventAsync()
        {
            var query = new TableQuery<Event>().Where(HasActiveDates());

            var events = await GetAllByQueryAsync(query);

            var modelEvents = _mapper.Map<List<Models.Event>>(events);

            return modelEvents;
        }
    }
}
