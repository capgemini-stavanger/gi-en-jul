using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Entities
{
    public class Event : EntityBase
    {
        //RK - Location
        //PK - Event name

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public string DeliveryAdress { get; set; }



    }
}
