using AutoMapper;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Serilog;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Repositories
{
    public interface IEventRepository
    {
        Task<string> GetActiveEventForLocationAsync(string location);
        Task<string[]> GetLocationsWithActiveEventAsync();
        Task<string[]> GetLocationsOpenForSignUpAsync();
        Task<string> GetDeliveryAddressForLocationAsync(string location);
        Task<(int, string)> GetGiverLimitAndEventNameForLocationAsync(string location);
        Task<Models.Event> InsertOrReplaceAsync(Models.Event model);
        Task<Models.Event> GetEventByUserLocationAsync(string location);
        Task<List<Models.Event>> GetAllEventsAsync();
        Task<string[]> GetAllUniqueEventNames();
        Task<Entities.Event> DeleteEntry(string eventName, string municipality);
        Task<IEnumerable<Models.Event>> GetExpiredEvents();
        Task CompleteEvent(Models.Event event_);
    }

    public class EventRepository : GenericRepository<Event>, IEventRepository
    {
        public EventRepository(ISettings settings, IMapper mapper, ILogger log, string tableName = "Event") : base(settings, tableName, mapper, log)
        { }

        public async Task<Models.Event> GetEventByUserLocationAsync(string location)
        {
            var eventByLocation = await GetEventByLocationAsync(location);

            return _mapper.Map<Models.Event>(eventByLocation);
        }

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

        public async Task<(int, string)> GetGiverLimitAndEventNameForLocationAsync(string location)
        {
            var evnt = await GetEventByLocationAsync(location);
            return (evnt.GiverLimit, evnt.PartitionKey);
        }

        private async Task<Event> GetEventByLocationAsync(string location)
        {
            if (string.IsNullOrEmpty(location))
            {
                throw new ArgumentException($"'{nameof(location)}' cannot be null or empty.", nameof(location));
            }

            // RowKey == location
            var rowKeyFilter = $"RowKey eq '{location}'";

            var activeEvent = await GetAllByQueryAsync(rowKeyFilter);

            if (activeEvent == null || !activeEvent.Any())
            {
                return null;
            }
            _log.Debug("Found active event: {@0} for location: {1}", activeEvent.First().PartitionKey, location);

            return activeEvent.First(x => x.StartDate < DateTime.Now && x.EndDate > DateTime.Now);
        }

        public async Task<List<Models.Event>> GetAllEventsAsync()
        {
            var events = await GetAllAsync();
            var modelEvents = _mapper.Map<List<Models.Event>>(events);

            return modelEvents;
        }

        public async Task<string[]> GetAllUniqueEventNames()
        {
            var events = await GetAllAsync();
            // Partition key is "EventName"
            var uniqueEventNames = events.Select(e => e.PartitionKey).Distinct().ToArray();

            return uniqueEventNames;
        }

        public async Task<string[]> GetLocationsWithActiveEventAsync()
        {
            var events = await GetAllByQueryAsync(HasActiveDates());

            var locationArray = events.Select(x => x.RowKey).ToArray();
            Array.Sort(locationArray);
            return locationArray;
        }

        public async Task<string[]> GetLocationsOpenForSignUpAsync()
        {
            var events = await GetAllByQueryAsync(HasActiveDates());
            events = events.Where(e => !e.SignUpDueDate.HasValue || e.SignUpDueDate > DateTimeOffset.UtcNow);

            var locationArray = events.Select(x => x.RowKey).ToArray();
            Array.Sort(locationArray);
            return locationArray;
        }

        private string HasActiveDates()
        {
            // StartDate <= DateTime.Now
            var startDatePassed = $"StartDate le datetime'{DateTimeOffset.UtcNow.ToString("o", CultureInfo.InvariantCulture)}'";
            // EndDate >= DateTime.Now
            var endDateNotPassed = $"EndDate gt datetime'{DateTimeOffset.UtcNow.ToString("o", CultureInfo.InvariantCulture)}'";

            return string.Join(" and ", startDatePassed, endDateNotPassed);
        }

        public async Task<Models.Event> InsertOrReplaceAsync(Models.Event model)
        {
            var inserted = await InsertOrReplaceAsync(_mapper.Map<Entities.Event>(model));
            return _mapper.Map<Models.Event>(inserted);
        }

        public async Task<Entities.Event> DeleteEntry(string eventName, string municipality)
        {
            try
            {
                var deleted = await DeleteAsync(eventName, municipality);
                return deleted;
            }
            catch
            {
                return null;
            }
        }

        public async Task<IEnumerable<Models.Event>> GetExpiredEvents()
        {
            var events = await GetAllByQueryAsync($"EndDate lt '{DateTime.UtcNow.ToString("O")}'");
            var mappedEvents = _mapper.Map<IEnumerable<Models.Event>>(events);
            return mappedEvents;
        }

        public async Task CompleteEvent(Models.Event event_)
        {
            var entity = _mapper.Map<Entities.Event>(event_);
            entity.Completed = true;
            await InsertOrReplaceAsync(entity);
        }
    }
}
