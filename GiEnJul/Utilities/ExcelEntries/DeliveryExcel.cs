using ClosedXML.Attributes;
using GiEnJul.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace GiEnJul.Utilities.ExcelClasses
{
    public class DeliveryExcel : IExcel
    {
        public string Check { get; }
        public string FamilyId { get; set; }
        public string ReferenceId { get; set; }

        public void AddHeader(ref DataTable table)
        {
            table.Columns.Add("Cross", typeof(string));
            table.Columns.Add("Family id", typeof(string));
            table.Columns.Add("Reference id", typeof(string));
        }

        public void AddRow (ref DataTable table)
        {
            table.Rows.Add(
                Check, 
                FamilyId, 
                ReferenceId
                );
        }
    }
}
