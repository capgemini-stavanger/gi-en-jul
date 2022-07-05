using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostCmsDto
    {
        [Required]
        public string ContentType { get; set; }
        public string Index { get; set; }
        public string Question { get; set; }
        public string Info { get; set; }
    }
}
