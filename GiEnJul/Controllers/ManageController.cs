using GiEnJul.Auth;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManageController : ControllerBase
    {
        private readonly IAuth0ManagementClient _auth0ManagementClient;

        public ManageController(IAuth0ManagementClient auth0ManagementClient)
        {
            _auth0ManagementClient = auth0ManagementClient;
        }

        [HttpPost("User/Create")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> CreateUser([FromBody] CreateUserDto userDto)
        {
            try
            {
                var user = await _auth0ManagementClient.CreateUser(userDto);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
