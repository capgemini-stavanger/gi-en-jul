using System.Collections.Specialized;

namespace GiEnJul.Utilities.ExcelClasses
{
    public class SubmittedFamiliesExcel : IExcel
    {
        public string FamilyId { get; set; }
        public string ReferenceId { get; set; }
        public string ContactFullName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhoneNumber { get; set; }
        public int PersonCount { get; set; }

        public OrderedDictionary AsOrderedDictionary()
        {
            return new OrderedDictionary
            {
                ["Familie id"] = FamilyId,
                ["Referanse id"] = ReferenceId,
                ["Kontaktperson"] = ContactFullName,
                ["Kontaktperson epost"] = ContactEmail,
                ["Kontaktperson telefon"] = ContactPhoneNumber,
                ["Familie antall"] = PersonCount,
            };
        }
    }
}
