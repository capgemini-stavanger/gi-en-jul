using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PutRecipientDto
    {
        [Required]
        public string RowKey { get; set; }
        [Required]
        public string PartitionKey { get; set; }
        [Required]
        public string Dinner { get; set; }
        [Required]
        public string Dessert { get; set; }
        public string Note { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(999)]
        public List<PutPersonDto> FamilyMembers { get; set; } = new List<PutPersonDto>();
    }
}