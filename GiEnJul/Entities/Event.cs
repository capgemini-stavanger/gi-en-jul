﻿using System;

namespace GiEnJul.Entities
{
    public class Event : EntityBase
    {
        //RK - EventType
        //PK - City

        public string EventType { get; set; }
        public string City { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string DeliveryAddress { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string Facebook { get; set; }
        public string Instagram { get; set; }
    }
}
