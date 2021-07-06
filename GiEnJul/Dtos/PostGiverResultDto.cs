using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Dtos
{
    public class PostGiverResultDto 
    {
        public string FullName { get; set; }
        public string Email { get; set; }
    }
}
