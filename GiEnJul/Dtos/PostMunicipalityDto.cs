using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostMunicipalityDto
    {
        [Required]
        public string Country { get; set; }
        [Required]
        public string Name { get; set; }
        public string Information { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        
    }
}
