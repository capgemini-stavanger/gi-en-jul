using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostRecipientDto
    {
        [Required]
        public string Dinner { get; set; }
        [Required]
        public string Dessert { get; set; }
        public string Note { get; set; }
        [Required]
        public string Location { get; set; }

        [Required]
        public string ContactFullName { get; set; }
        [Required]
        [EmailAddress]
        public string ContactEmail { get; set; }
        [Required]
        [Phone]
        public string ContactPhoneNumber { get; set; }

        [Required]
        public string Institution { get; set; }
        public string ReferenceId { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(999)]
        public List<PostPersonDto> FamilyMembers { get; set; } = new List<PostPersonDto>();
    }
}
