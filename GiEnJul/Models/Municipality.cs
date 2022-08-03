using System.Collections.Generic;

namespace GiEnJul.Models
{
    public class Municipality
    {
        //PK
        public string Country { get; set; }
        //RK
        public string Name { get; set; }
        public string Information { get; set; }
        public bool IsActive { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
        public string PhoneNumber { get; set; }
        public string InfoImage1 { get; set; }
        public string InfoImage2 { get; set; }
        public string InfoImage3 { get; set; }
    }
}


