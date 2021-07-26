using ClosedXML.Excel;
using GiEnJul.Utilities.ExcelClasses;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace GiEnJul.Utilities
{
    public static class ExcelGenerator
    {
        public static async Task<XLWorkbook> Generate(IEnumerable<IExcel> excelEntries)
        {
            return await Task.Run(() =>
            {
                var workbook = new XLWorkbook();
                var table = new DataTable();
                var addedHeader = false;
                foreach (var entry in excelEntries)
                {
                    if (!addedHeader)
                    {
                        addedHeader = true;
                        entry.AddHeader(ref table);
                    }
                    entry.AddRow(ref table);
                }
                var worksheet = workbook.Worksheets.Add("Delivery");
                worksheet.FirstCell().InsertTable(table);
                return workbook;
            });
        }
    }
}
