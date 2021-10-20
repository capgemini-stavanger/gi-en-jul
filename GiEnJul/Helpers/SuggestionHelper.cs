using GiEnJul.Models;
using GiEnJul.Utilities.Constants;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GiEnJul.Helpers
{
    public static class SuggestionHelper
    {
        public static List<Recipient> GetRandomSuggestions(IEnumerable<Recipient> recipients, int quantity)
        {
            var suggestions = new List<Recipient>();

            var random = new Random();

            suggestions.AddRange(recipients.Where(x => x.PersonCount <= FamilySize.Small).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(recipients.Where(x => x.PersonCount > FamilySize.Small && x.PersonCount <= FamilySize.Medium).OrderBy(x => random.Next()).Take(quantity));
            suggestions.AddRange(recipients.Where(x => x.PersonCount > FamilySize.Medium && x.PersonCount <= FamilySize.Large).OrderBy(x => random.Next()).Take(quantity));

            return suggestions;
        }
    }
}
