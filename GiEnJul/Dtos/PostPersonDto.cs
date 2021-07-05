using GiEnJul.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Dtos
{
    public class PostPersonDto
    {
        [Required]
        public string Wish { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public Gender Gender { get; set; }
    }
}
