using GiEnJul.Models;
using System.Collections.Generic;

namespace GiEnJul.Helpers
{
    public static class EmailDictionaryHelper
    {
        public static Dictionary<string, string> MakeVerifyEmailContent(Models.Giver giver, Models.Recipient recipient, string baseUrl)
        {
            var verifyLink = $"{baseUrl}/{giver.GiverId}/{recipient.RecipientId}/{giver.Event}/verify";
            var denyLink = $"{baseUrl}/{giver.GiverId}/{recipient.RecipientId}/{giver.Event}/deny";

            var familyTable = MakeFamilyTable(recipient);
            var emailValuesDict = new Dictionary<string, string>
                {
                    { "familyTable", familyTable },
                    { "verifyLink", verifyLink },
                    { "denyLink", denyLink },
                };
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(giver, "giver."));
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(recipient, "recipient."));

            return emailValuesDict;
        }

        private static string MakeFamilyTable(Recipient recipient)
        {
            var familyTable = "";
            for (var i = 0; i < recipient.PersonCount; i++)
            {
                if (recipient.FamilyMembers != null)
                {
                    var member = recipient.FamilyMembers[i];
                    familyTable += $"<li> {member.GetGenderAge()} </li>";
                    familyTable += " ";
                }
            }

            return familyTable;
        }
    }
}
