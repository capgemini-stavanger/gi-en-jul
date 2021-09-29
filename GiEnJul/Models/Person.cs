namespace GiEnJul.Models
{
    public class Person
    {
        public string RowKey { get; set; }
        public string PartitionKey { get; set; }

        public string Wish { get; set; }
        public int Age { get; set; }
        public int Months {  get; set; }
        public Gender Gender { get; set; }

        public string ToReadableString()
        {
            return $"{GenderToString()} {Age} år, {(string.IsNullOrEmpty(Wish) ? " Ønske ikke spesifisert" : Wish)}";
        }

        private string GenderToString()
        {
            switch (Gender)
            {
                case Gender.Female:
                    return Age > 18 ? "Kvinne" : "Jente";
                case Gender.Male:
                    return Age > 18 ? "Mann" : "Gutt";
                case Gender.Unspecified:
                default:
                    return "Ikke spesifisert";
            }
        }
    }

    public enum Gender
    {
        Male = 1,
        Female = 2,
        Unspecified = 0
    }
}
