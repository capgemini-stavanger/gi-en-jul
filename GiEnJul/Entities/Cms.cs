using System;

namespace GiEnJul.Entities
{
    public class Cms :EntityBase
    {
        // PK - ContentType
        // RK - Index
        public string Question { get; set; }
        public string Info { get; set; }
    }
}
