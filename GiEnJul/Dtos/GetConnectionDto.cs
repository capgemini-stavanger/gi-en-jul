﻿
namespace GiEnJul.Dtos
{
    public class GetConnectionDto
    {
        public string FamilyId { get; set; }
        public int PersonCount { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public bool Confirmed { get; set; }
    }
}