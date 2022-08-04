using ClosedXML.Excel;
using GiEnJul.Utilities.ExcelClasses;
using System.Collections;
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
            var headers = excelEntries?.FirstOrDefault().AsOrderedDictionary().Keys
                ?? throw new InvalidExpressionException("Cannot generate excel sheet with no headers");

            var table = CreateTable(excelEntries,  headers);
            var worksheet = workbook.Worksheets.Add("Worksheet");
            worksheet.FirstCell().InsertTable(table);
            worksheet.Columns().AdjustToContents();
            return workbook;
        }

        public static XLWorkbook GenerateForRecipients(
            IEnumerable<SubmittedFamiliesExcel> familyEntries, 
            IEnumerable<SubmittedPersonExcel> personEntries)
        {
            var workbook = new XLWorkbook();
            
            //Family Table
            var familyHeaders = familyEntries?.FirstOrDefault().AsOrderedDictionary().Keys;
            var familyTable = CreateTable(familyEntries, familyHeaders);
            var familyWorksheet = workbook.Worksheets.Add("Familier");

            familyWorksheet.FirstCell().InsertTable(familyTable);
            familyWorksheet.Columns().AdjustToContents();

            //Person Table
            var personHeaders = personEntries?.OrderByDescending(p => p.Wishes.Count).FirstOrDefault().AsOrderedDictionary().Keys;
            var personTable = CreateTable(personEntries, personHeaders);
            var personWorksheet = workbook.Worksheets.Add("Personer");
            
            personWorksheet.FirstCell().InsertTable(personTable);
            personWorksheet.Columns().AdjustToContents();

            return workbook;
        }

        private static DataTable CreateTable(IEnumerable<IExcel> excelEntries, ICollection headers)
        {
            var table = new DataTable();

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

            return table;
        }
    }
}
