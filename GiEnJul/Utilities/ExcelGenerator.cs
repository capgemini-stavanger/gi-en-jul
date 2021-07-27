using ClosedXML.Excel;
using GiEnJul.Helpers;
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
                var excelType = excelEntries.GetType().GetGenericArguments()[0];
                ExcelHelper.AddHeaders(ref table, excelType);
                foreach (var entry in excelEntries)
                {
                    table.Rows.Add(entry.AsObjectArray());
                }
                var worksheet = workbook.Worksheets.Add(ExcelHelper.GetWorksheetName(excelType));
                worksheet.FirstCell().InsertTable(table);
                worksheet.Columns().AdjustToContents();
                return workbook;
            });
        }
    }
}
