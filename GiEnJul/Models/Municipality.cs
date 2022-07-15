namespace GiEnJul.Models
{
    public class Municipality
    {
        //PK
        public string Country { get; set; }
        //RK
        public string Name { get; set; }
        public string Information { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public string Email { get; set; }
    }
}

