using GiEnJul.Models;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostPersonDto
    {
        public string Wish { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public Gender Gender { get; set; }
    }
}
