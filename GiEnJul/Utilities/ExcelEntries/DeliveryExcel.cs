using System.Collections.Specialized;

namespace GiEnJul.Utilities.ExcelClasses
{
    public class DeliveryExcel : IExcel
    {
        public string Check { get; }
        public string FamilyId { get; set; }
        public string Institution { get; set; }
        public string ReferenceId { get; set; }
        public string GiverFullName { get; set; }
        public string GiverPhoneNumber { get; set; }
        public string SubmitterFullName { get; set; }

        public OrderedDictionary AsOrderedDictionary()
        {
            return new OrderedDictionary
            {
                ["Hentet"] = Check,
                ["Familie id"] = FamilyId,
                ["Institusjon"] = Institution,
                ["Referanse id"] = ReferenceId,
                ["Giver navn"] = GiverFullName,
                ["Giver mobil"] = GiverPhoneNumber,
                ["Kontaktperson"] = SubmitterFullName,
            };
        }
    }
}
