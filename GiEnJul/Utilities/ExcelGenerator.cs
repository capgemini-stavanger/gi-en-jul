using ClosedXML.Excel;
using GiEnJul.Helpers;
using GiEnJul.Utilities.ExcelClasses;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Linq;

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
                foreach (var entry in excelEntries)
                {
                    foreach (var header in entry.AsOrderedDictionary().Keys)
                    {
                        table.Columns.Add(new DataColumn((string)header));
                    }
                    break;
                }
                foreach (var entry in excelEntries)
                {
                    var dataRow = table.NewRow();
                    var dict = entry.AsOrderedDictionary();
                    foreach (var key in dict.Keys)
                    {
                        dataRow[(string)key] = dict[key];
                    }
                    table.Rows.Add(dataRow);
                }
                var worksheet = workbook.Worksheets.Add("Worksheet");
                worksheet.FirstCell().InsertTable(table);
                worksheet.Columns().AdjustToContents();
                return workbook;
            });
        }
    }
}
