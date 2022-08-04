using GiEnJul.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostPersonDto
    {
        public IEnumerable<string> Wishes { get; set; }
        [Required]
        public int Age { get; set; }
        public int Months { get; set; }
        [Required]
        public Gender Gender { get; set; }
        public bool NoWish { get; set; }
    }
}
