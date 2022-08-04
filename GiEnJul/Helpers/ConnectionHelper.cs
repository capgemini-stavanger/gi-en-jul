using GiEnJul.Models;
using System;

namespace GiEnJul.Helpers
{
    public static class ConnectionHelper
    {

        public static bool CanConnect(Giver giver, Recipient recipient)
        {
            if (giver.IsSuggestedMatch || giver.HasConfirmedMatch ||
                recipient.IsSuggestedMatch || recipient.HasConfirmedMatch)
            {
                return false;
            }
            else {
                return true;
            }
        }

        public static bool MatchingIds(Giver giver, Recipient recipient, string giverIdDto, string recipientIdDto)
        {
            if ((recipient.MatchedGiver != giverIdDto) || (giver.MatchedRecipient != recipientIdDto))
            {
                return false;
            } else
            {
                return true;
            }
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
