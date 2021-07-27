using System.Collections.Specialized;

namespace GiEnJul.Utilities.ExcelClasses
{
    public class DeliveryExcel : IExcel
    {
        public string Check { get; }
        public string FamilyId { get; set; }
        public int PersonCount { get; set; }
        public string Institution { get; set; }
        public string ReferenceId { get; set; }
        public string SubmitterFullName { get; set; }
        public string SubmitterEmail { get; set; }
        public string SubmitterPhoneNumber { get; set; }
        public string GiverFullName { get; set; }
        public string GiverEmail { get; set; }
        public string GiverPhoneNumber { get; set; }

        public OrderedDictionary AsOrderedDictionary()
        {
            return new OrderedDictionary
            {
                ["Hentet"] = Check,
                ["Familie id"] = FamilyId,
                ["Familiemedlemmer"] = PersonCount,
                ["Institusjon"] = Institution,
                ["Referanse id"] = ReferenceId,
                ["Innmelder navn"] = SubmitterFullName,
                ["Innmelder mobil"] = SubmitterPhoneNumber,
                ["Innmelder email"] = SubmitterEmail,
                ["Giver navn"] = GiverFullName,
                ["Giver mobil"] = GiverPhoneNumber,
                ["Giver email"] = GiverEmail
            };
        }
    }
}
