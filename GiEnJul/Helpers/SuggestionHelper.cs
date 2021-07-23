using GiEnJul.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GiEnJul.Helpers
{
    public static class SuggestionHelper
    {

        public static List<Entities.Giver> GetSuggestions(IEnumerable<Entities.Giver> givers, int quantity)
        {
            var suggestions = new List<Entities.Giver>();

            var random = new Random();
            suggestions.AddRange(givers.Where(x => x.MaxReceivers == 2).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(givers.Where(x => x.MaxReceivers == 5).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(givers.Where(x => x.MaxReceivers == 100).OrderBy(x => random.Next()).Take(quantity));

            return suggestions;
        }

        public static List<Entities.Recipient> GetSuggestions(IEnumerable<Entities.Recipient> recipients, int quantity)
        {
            var suggestions = new List<Entities.Recipient>();

            var random = new Random();
            suggestions.AddRange(recipients.Where(x => x.PersonCount <= 2).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(recipients.Where(x => x.PersonCount > 2 && x.PersonCount <= 5).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(recipients.Where(x => x.PersonCount > 5 && x.PersonCount <= 100).OrderBy(x => random.Next()).Take(quantity));

            return suggestions;
        }
    }
}
