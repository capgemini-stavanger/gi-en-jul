using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gi_en_jul.Entities
{
    public class Registerer : ContactInfo
    {
        //Foreign Keys
        public string InstitutionId { get; set; }
    }
}
