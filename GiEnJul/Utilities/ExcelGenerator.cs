using ClosedXML.Excel;
using GiEnJul.Utilities.ExcelClasses;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace GiEnJul.Utilities
{
    public static class ExcelGenerator
    {
        public static XLWorkbook Generate(IEnumerable<IExcel> excelEntries)
        {
            var workbook = new XLWorkbook();
            var table = new DataTable();
            var headers = excelEntries?.FirstOrDefault().AsOrderedDictionary().Keys
                ?? throw new InvalidExpressionException("Cannot generate excel sheet with no headers");
            foreach (var header in headers)
            {
                table.Columns.Add(new DataColumn((string)header));
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
