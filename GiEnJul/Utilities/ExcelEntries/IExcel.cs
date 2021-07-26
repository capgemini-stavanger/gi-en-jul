using ClosedXML.Excel;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace GiEnJul.Utilities.ExcelClasses
{
    public interface IExcel {
        void AddHeader(ref DataTable table);
        void AddRow(ref DataTable table);
    }
}
