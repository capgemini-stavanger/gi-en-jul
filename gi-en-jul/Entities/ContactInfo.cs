using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Azure.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gi_en_jul.Entities
{
    public class ContactInfo : TableEntity
    {
        [ProtectedPersonalData]
        public string FullName { get; set; }
        [ProtectedPersonalData]
        public int PhoneNumber { get; set; }
        [ProtectedPersonalData]
        public string Email { get; set; }

    }
}
