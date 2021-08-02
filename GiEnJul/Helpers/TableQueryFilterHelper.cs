using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Utilities
{
    public static class TableQueryFilterHelper
    {
        public static string GetUnsuggestedFilter(string eventName, string location)
        {
            var PKfilter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, $"{eventName}_{location}");
            var notSuggestedFilter = TableQuery.GenerateFilterConditionForBool("IsSuggestedMatch", QueryComparisons.Equal, false);
            var notConfirmedFilter = TableQuery.GenerateFilterConditionForBool("HasConfirmedMatch", QueryComparisons.Equal, false);
            var eventNameFilter = TableQuery.GenerateFilterCondition("EventName", QueryComparisons.Equal, eventName);
            var locationFilter = TableQuery.GenerateFilterCondition("Location", QueryComparisons.Equal, location);

            var filter = TableQuery
                .CombineFilters(PKfilter, TableOperators.And, TableQuery
                .CombineFilters(notSuggestedFilter, TableOperators.And, TableQuery
                .CombineFilters(notConfirmedFilter, TableOperators.And, TableQuery
                .CombineFilters(eventNameFilter, TableOperators.And, locationFilter))));

            return filter;
        }

        public static string GetAllByActiveEventsFilter(string eventName, string location)
        {
            var PKfilter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, $"{eventName}_{location}");
            var eventNameFilter = TableQuery.GenerateFilterCondition("EventName", QueryComparisons.Equal, eventName);
            var locationFilter = TableQuery.GenerateFilterCondition("Location", QueryComparisons.Equal, location);

            var filter = TableQuery
                .CombineFilters(PKfilter, TableOperators.And, TableQuery
                .CombineFilters(eventNameFilter, TableOperators.And, locationFilter));
            return filter;
        }
    }
}
