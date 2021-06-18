using Microsoft.Azure.Cosmos.Table;

namespace GiEnJul.Models
{
    public class Giver : TableEntity
    {
        public int MaxRecievers { get; set; }
        public string Location { get; set; }

        public string FullName { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }

        public Recipient Receiver { get; set; }


    }
}
