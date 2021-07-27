using System.Data;

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

        public object[] AsObjectArray()
        {
            var props = GetType().GetProperties();

            var obj = new object[props.Length];
            for (int i = 0; i < props.Length; i++)
            {
                obj[i] = props[i].GetValue(this);
            }

            return obj;
        }
    }
}
