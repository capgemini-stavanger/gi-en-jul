namespace GiEnJul.Models
{
    public class Person
    {
        //PartitionKey
        public string RecipientId { get; set; }
        //RowKey
        public string PersonId { get; set; }

        public string Wish { get; set; }
        public int Age { get; set; }
        public int Months {  get; set; }
        public Gender Gender { get; set; }
        public string Comment { get; set; }

        public string ToReadableString()
        {
            return $"<strong>{GenderToString()} {Age} år:</strong> {(string.IsNullOrEmpty(Wish) ? "  Her du kan selv finne alderstilpasset gave" : Wish)} {(string.IsNullOrEmpty(Comment) ? " " : ", Kommentar til gave: "+Comment)}";
        }

        public string GetGenderAge()
        {
            return $"<strong>{GenderToString()} {Age} år</strong>";
        }

        private string GenderToString()
        {
            return Gender switch
            {
                Gender.Female => Age > 18 ? "Kvinne" : "Jente",
                Gender.Male => Age > 18 ? "Mann" : "Gutt",
                Gender.NonBinary => "Ikke-binær",
                _ => "Ikke spesifisert",
            };
        }
    }

    public enum Gender
    {
        Male = 1,
        Female = 2,
        NonBinary = 9,
        Unspecified = 0
    }
}
