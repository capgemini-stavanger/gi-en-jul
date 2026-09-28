using Auth0.ManagementApi.Models;
using GiEnJul.Auth;
using GiEnJul.Clients;
using GiEnJul.Dtos;
using GiEnJul.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiEnJul.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IAuth0ManagementClient _auth0ManagementClient;
    private readonly ISettings _settings;

    public UserController(IAuth0ManagementClient auth0ManagementClient, ISettings settings)
    {
        _auth0ManagementClient = auth0ManagementClient;
        _settings = settings;
    }

    public class FormattedUser
    {
        public string email { get; set; } = string.Empty;
        public string location { get; set; } = string.Empty;
        public string role { get; set; } = string.Empty;
        public string institution { get; set; } = string.Empty;

        public FormattedUser(string email, string location, string role, string institution)
        {
            this.role = role;
            this.location = location;
            this.email = email;
            this.institution = institution;
        }
    }

    [HttpGet("users")]
    [Authorize(Policy = Policy.SuperAdmin)]
    public async Task<List<FormattedUser>> GetUsersFormat()
    {
        var users = await _auth0ManagementClient.GetAllUsers();

        var format = new List<FormattedUser>();
        foreach (User u in users)
        {
            {
                try
                {
                    format.Add(new FormattedUser(u.Email, Convert.ToString(u.UserMetadata.location),
                            Convert.ToString(u.AppMetadata.role), Convert.ToString(u.AppMetadata.institution)));
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    Console.WriteLine(u.Email);
                }
            }
        }
        return format;
    }

    [HttpPost("create")]
    [Authorize(Policy = Policy.SuperAdmin)]
    public async Task<ActionResult> CreateUser([FromBody] CreateUserDto content)
    {
        try
        {
            var user = await _auth0ManagementClient.CreateUser(content);

            if (content.Role == "Admin")
            {
                await _auth0ManagementClient.AddUserRole(user, _settings.Auth0Settings.Admin);
            }
            else if (content.Role == "Institution")
            {
                await _auth0ManagementClient.AddUserRole(user, _settings.Auth0Settings.Institution);
            }
            else if (content.Role == "SuperAdmin")
            {
                await _auth0ManagementClient.AddUserRole(user, _settings.Auth0Settings.SuperAdmin);
            }
            return Ok();
        }
        catch
        {
            return BadRequest("could not create user");
        }
    }

    [HttpGet("getsingle")]
    [Authorize(Policy = Policy.SuperAdmin)]
    public async Task<User?> GetSingleUser([FromQuery] string email)
    {
        return await _auth0ManagementClient.GetSingleUser(email);
    }

    [HttpDelete("delete")]
    [Authorize(Policy = Policy.SuperAdmin)]
    public async Task DeleteUser([FromQuery] string email)
    {
        await _auth0ManagementClient.DeleteUser(email);
    }
}