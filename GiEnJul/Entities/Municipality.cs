namespace GiEnJul.Entities
{
    public class Municipality: EntityBase
    {

        //PK: country 
        //RK: name of municipality 
        public string Information { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
    }
}
