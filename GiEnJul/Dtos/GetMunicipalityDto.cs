using System.Collections.Generic;

namespace GiEnJul.Dtos
{
    public class GetMunicipalityDto
    {
        public string Country { get; set; }
        public string Name { get; set; }
        public string Information { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }
        public List<string> Images { get; set; }
    }
}
