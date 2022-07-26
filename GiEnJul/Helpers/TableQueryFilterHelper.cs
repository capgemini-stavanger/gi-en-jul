using System;

namespace GiEnJul.Helpers
{
    public static class TableQueryFilterHelper
    {
        public static string GetUnsuggestedFilter(string eventName, string location)
        {
            var PKfilter = $"PartitionKey eq '{eventName}_{location}'";
            var notSuggestedFilter = "IsSuggestedMatch eq false";
            var notConfirmedFilter = "HasConfirmedMatch eq false";
            var eventNameFilter = $"EventName eq '{eventName}'";
            var locationFilter = $"Location eq '{location}'";

            var filter = string.Join(" and ", PKfilter, notSuggestedFilter, notConfirmedFilter, eventNameFilter, locationFilter);

            return filter;
        }

        public static string GetSuggestedFilter(string eventName, string location)
        {
            var PKfilter = $"PartitionKey eq '{eventName}_{location}'";
            var notSuggestedFilter = "IsSuggestedMatch eq true";
            var notConfirmedFilter = "HasConfirmedMatch eq false";
            var eventNameFilter = $"EventName eq '{eventName}'";
            var locationFilter = $"Location eq '{location}'";

            var filter = string.Join(" and ", PKfilter, notSuggestedFilter, notConfirmedFilter, eventNameFilter, locationFilter);

            return filter;
        }

        public static string GetAllByActiveEventsFilter(string eventName, string location)
        {
            var PKfilter = $"PartitionKey eq '{eventName}_{location}'";
            var eventNameFilter = $"EventName eq '{eventName}'";
            var locationFilter = $"Location eq '{location}'";

            var filter = string.Join(" and ", PKfilter, eventNameFilter, locationFilter);
            return filter;
        }

        public static string GetStaleGiversQuery(DateTime olderThanDate)
        {
            var notConfirmed = $"IsSuggestedMatch eq true and HasConfirmedMatch eq false";
            var suggested = $"SuggestedMatchAt le datetime'{olderThanDate:O}'";

            return string.Join(" and ", notConfirmed, suggested);
        }
    }
}
