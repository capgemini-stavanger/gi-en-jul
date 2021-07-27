using GiEnJul.Utilities.ExcelClasses;
using System;
using System.Data;

namespace GiEnJul.Helpers
{
    public static class ExcelHelper
    {
        private static void AddDeliveryHeaders(ref DataTable table)
        {
            table.Columns.Add("Hentet", typeof(string));
            table.Columns.Add("Familie id", typeof(string));
            table.Columns.Add("Familiemedlemmer", typeof(int));
            table.Columns.Add("Institusjon", typeof(string));
            table.Columns.Add("Referanse id", typeof(string));
            table.Columns.Add("Innmelder navn", typeof(string));
            table.Columns.Add("Innmelder mobil", typeof(string));
            table.Columns.Add("Innmelder email", typeof(string));
            table.Columns.Add("Giver navn", typeof(string));
            table.Columns.Add("Giver mobil", typeof(string));
            table.Columns.Add("Giver email", typeof(string));
        }

        public static void AddHeaders(ref DataTable table, Type type)
        {
            if (type == typeof(DeliveryExcel))
            {
                AddDeliveryHeaders(ref table);
            } else
            {
                throw new InvalidOperationException($"Cannot add excel headers to type: {type}");
            }
        }

        public static string GetWorksheetName(Type type)
        {
            if (type == typeof(DeliveryExcel))
            {
                return "Leveranse";
            } else
            {
                throw new InvalidOperationException($"Cannot get excel worksheet name for type: {type}");
            }
        }

    }

}
