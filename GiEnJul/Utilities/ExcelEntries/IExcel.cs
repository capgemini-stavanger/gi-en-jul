using System.Data;

namespace GiEnJul.Utilities.ExcelClasses
{
    public interface IExcel
    {
        void AddRow(ref DataTable table);
    }
}
