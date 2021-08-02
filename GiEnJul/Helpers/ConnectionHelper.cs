using GiEnJul.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Utilities
{
    public static class ConnectionHelper
    {

        public static bool CanConnect(Giver giver, Recipient recipient)
        {
            return
                recipient.IsSuggestedMatch &&
                giver.IsSuggestedMatch &&
                giver.MatchedRecipient == recipient.RowKey &&
                recipient.MatchedGiver == giver.RowKey &&
                CanSuggestConnection(giver, recipient);
        }

        public static bool CanSuggestConnection(Giver giver, Recipient recipient)
        {
            if (giver is null)
                throw new ArgumentNullException(nameof(giver));
            

            if (recipient is null)
                throw new ArgumentNullException(nameof(recipient));
            
            return
                giver.PartitionKey == recipient.PartitionKey &&
                giver.Location == recipient.Location &&
                giver.EventName == recipient.EventName;
        }
    }
}
