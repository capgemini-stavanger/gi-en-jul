using GiEnJul.Models;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostPersonDto
    {
        public string Wish { get; set; }
        [Required]
        public int Age { get; set; }
        public int Months { get; set; }
        [Required]
        public Gender Gender { get; set; }
        public string Comment { get; set; }
    }
}
