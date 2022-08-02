using System;
using System.Collections.Generic;
using System.Linq;

namespace GiEnJul.Models
{
    public class Person
    {
        //PartitionKey
        public string RecipientId { get; set; }
        //RowKey
        public string PersonId { get; set; }

        public IEnumerable<string> Wishes { get; set; }
        public int Age { get; set; }
        public int Months {  get; set; }
        public Gender Gender { get; set; }
        public bool NoWish { get; set; }

        public string ToReadableString()
        {
            return $"{GetGenderAge()}: {(NoWish ? "  Her du kan selv finne alderstilpasset gave" : String.Join(", ", Wishes))}";
        }

        public string GetGenderAge()
        {
            if (Age > 0) {
                return $"<strong>{GenderToString()} {Age} år</strong>";
            } else
            {
                return $"<strong>{GenderToString()} 0 år og {Months} måneder</strong>";
            }
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
