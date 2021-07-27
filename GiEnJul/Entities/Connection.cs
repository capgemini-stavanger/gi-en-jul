using GiEnJul.Exceptions;

namespace GiEnJul.Entities
{
    public class Connection : EntityBase
    {
        public Connection()
        { }

        public Connection(string receiverLocation, string rowKey) : base(receiverLocation, rowKey)
        { }
        public Connection(Giver giver, Recipient recipient)
        {
            if (giver.PartitionKey != recipient.PartitionKey)
            {
                throw new InvalidEventException("Locations/events must match for giver and recipient");
            }
            RowKey = $"{recipient.RowKey}_{giver.RowKey}";
            PartitionKey = giver.PartitionKey;

            Dinner = recipient.Dinner;
            Dessert = recipient.Dessert;
            Note = recipient.Note;
            EventName = recipient.EventName;
            PersonCount = recipient.PersonCount;
            ReceiverLocation = recipient.Location;

            SubmitterFullName = giver.FullName;
            SubmitterEmail = giver.Email;
            SubmitterPhoneNumber = giver.PhoneNumber;

            Institution = recipient.Institution;
            ReferenceId = recipient.ReferenceId;

            MaxReceivers = giver.MaxReceivers;
            GiverLocation = giver.Location;
            GiverFullName = giver.FullName;
            GiverEmail = giver.Email;
            GiverPhoneNumber = giver.PhoneNumber;
        }

        // Family info
        public string Dinner { get; set; }
        public string Dessert { get; set; }
        public string Note { get; set; }
        public string EventName { get; set; }
        public int PersonCount { get; set; }
        public string ReceiverLocation { get; set; }

        // Submitter contact info
        public string SubmitterFullName { get; set; }
        public string SubmitterEmail { get; set; }
        public string SubmitterPhoneNumber { get; set; }

        // Submitter references
        public string Institution { get; set; }
        public string ReferenceId { get; set; }

        // Giver info
        public int MaxReceivers { get; set; }
        public string GiverLocation { get; set; }

        // Giver contact info
        public string GiverFullName { get; set; }
        public string GiverEmail { get; set; }
        public string GiverPhoneNumber { get; set; }
    }
}
