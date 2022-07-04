using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Dtos
{
    public class PostFeedbackGiverDto
    {
        public bool DeleteGiver { get; set; }
        [Required]
        public string FeedbackGiver { get; set; }
    }
}
