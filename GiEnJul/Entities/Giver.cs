using Microsoft.AspNetCore.Identity;
using Microsoft.Azure.Cosmos.Table;
using System;
using System.ComponentModel.DataAnnotations;

namespace GiEnJul.Entities
{
    public class Giver : EntityBase
    {
        public Giver()
        { }

        public Giver(string location, string eventName) : base($"{eventName}_{location}", Guid.NewGuid().ToString())
        {
            Location = location ?? throw new ArgumentNullException(nameof(location));
            EventName = eventName ?? throw new ArgumentNullException(nameof(eventName));
        }

        public int MaxRecievers { get; set; }
        public string Location { get; set; }
        public string EventName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
