using System;

namespace GiEnJul.Dtos
{
    public class UpdateGiverDto
    {
        public Guid Id { get; set; }
        public string Event { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
