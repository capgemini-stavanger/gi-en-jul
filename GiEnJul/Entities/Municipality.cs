using System.Collections.Generic;

namespace GiEnJul.Entities
{
    public class Municipality : EntityBase
    {

        //PK: country 
        //RK: name of municipality 
        public string Information { get; set; }
        public bool IsActive { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string PhoneNumber { get; set; }
    }
}
