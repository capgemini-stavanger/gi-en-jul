using GiEnJul.Models;
using System.Collections.Generic;

namespace GiEnJul.Helpers
{
    public static class EmailDictionaryHelper
    {
        public static Dictionary<string, string> MakeVerifyEmailContent(Models.Giver giver, Models.Recipient recipient, Models.Municipality municipality, string baseUrl)
        {
            var verifyLink = $"{baseUrl}/{giver.GiverId}/{recipient.RecipientId}/{giver.Event}";

            var familyTable = MakeFamilyTable(recipient);
            var emailValuesDict = new Dictionary<string, string>
                {
                    { "familyTable", familyTable },
                    { "verifyLink", verifyLink },
                };
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(giver, "giver."));
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(recipient, "recipient."));
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(municipality, "municipality."));

            return emailValuesDict;
        }
        public static Dictionary<string, string> MakeDisconnectEmailContent(Models.Giver giver, Models.Recipient recipient, Models.Municipality municipality)
        {
            var emailValuesDict = new Dictionary<string, string>();
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(giver, "giver."));
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(recipient, "recipient."));
            emailValuesDict.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(municipality, "municipality."));

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
