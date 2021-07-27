using ClosedXML.Excel;
using GiEnJul.Utilities.ExcelClasses;
using System.Collections.Generic;
using System.Data;

namespace GiEnJul.Utilities
{
    public static class ExcelGenerator
    {
        public static XLWorkbook Generate(IEnumerable<IExcel> excelEntries)
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
        }
    }
}
