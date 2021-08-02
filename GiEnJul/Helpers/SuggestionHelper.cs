using GiEnJul.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GiEnJul.Utilities
{
    public static class SuggestionHelper
    {

        public static List<Giver> GetRandomSuggestions(IEnumerable<Giver> givers, int quantity)
        {
            var suggestions = new List<Giver>();

            var random = new Random();
            suggestions.AddRange(givers.Where(x => x.MaxReceivers == 2).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(givers.Where(x => x.MaxReceivers == 5).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(givers.Where(x => x.MaxReceivers == 100).OrderBy(x => random.Next()).Take(quantity));

            return suggestions;
        }

        public static List<Recipient> GetRandomSuggestions(IEnumerable<Recipient> recipients, int quantity)
        {
            var suggestions = new List<Recipient>();

            var random = new Random();
            suggestions.AddRange(recipients.Where(x => x.PersonCount <= 2).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(recipients.Where(x => x.PersonCount > 2 && x.PersonCount <= 5).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(recipients.Where(x => x.PersonCount > 5 && x.PersonCount <= 100).OrderBy(x => random.Next()).Take(quantity));

            return suggestions;
        }
    }
}
