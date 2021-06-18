using Microsoft.Azure.Cosmos.Table;

namespace GiEnJul.Models
{
    public class Person : TableEntity
    {
        public string Wish { get; set; }
        public int Age { get; set; }
        //public char Gender { get; set; } ?
        public int Gender { get; set; }


        public Recipient Family { get; set; }
    }
}
