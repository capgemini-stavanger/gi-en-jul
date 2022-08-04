using GiEnJul.Models;
using System.Collections.Generic;
using System.Collections.Specialized;

namespace GiEnJul.Utilities.ExcelClasses
{
    public class SubmittedPersonExcel : IExcel
    {
        public string FamilyId { get; set; }
        public string ReferenceId { get; set; }
        public string Age{ get; set; }
        public Gender Gender { get; set; }
        public List<string> Wishes { get; set; }

        public string RecipientId { get; set; }

        public OrderedDictionary AsOrderedDictionary()
        {
            var dict = new OrderedDictionary
            {
                ["Familie id"] = FamilyId,
                ["Referanse id"] = ReferenceId,
                ["Alder"] = Age,
                ["Kjønn"] = Gender,
            };

            for (int i = 0; i < Wishes.Count; i++)
            {
                dict.Add($"Ønske {i + 1}", Wishes[i]);
            }

            return dict;
        }
    }
}
