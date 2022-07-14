using GiEnJul.Models;
using System;

namespace GiEnJul.Helpers
{
    public static class ConnectionHelper
    {

        public static bool CanConnect(Giver giver, Recipient recipient)
        {
            return
                recipient.IsSuggestedMatch &&
                giver.IsSuggestedMatch &&
                giver.MatchedRecipient == recipient.RecipientId &&
                recipient.MatchedGiver == giver.EventName &&
                CanSuggestConnection(giver, recipient);
        }

        public static bool CanSuggestConnection(Giver giver, Recipient recipient)
        {
            if (giver is null)
                throw new ArgumentNullException(nameof(giver));
            

            if (recipient is null)
                throw new ArgumentNullException(nameof(recipient));
            
            return
                giver.Event == recipient.Event &&
                giver.Location == recipient.Location &&
                giver.EventName == recipient.EventName;
        }
    }
}
