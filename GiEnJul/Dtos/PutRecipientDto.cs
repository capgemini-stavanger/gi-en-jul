using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PutRecipientDto
    {
        [Required]
        public string RecipientId { get; set; }
        [Required]
        public string Event { get; set; }
        [Required]
        public string Dinner { get; set; }
        [Required]
        public string Dessert { get; set; }
        public string Note { get; set; }
        public string ReferenceId { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(999)]
        public List<PutPersonDto> FamilyMembers { get; set; } = new List<PutPersonDto>();
    }
}