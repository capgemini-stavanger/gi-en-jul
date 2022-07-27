using GiEnJul.Clients;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Auth0.ManagementApi.Models;
using System;
using Microsoft.AspNetCore.Authorization;
using GiEnJul.Auth;
using GiEnJul.Dtos;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuth0ManagementClient _auth0ManagementClient;
        private readonly IMapper _mapper;

        public UserController(IAuth0ManagementClient auth0ManagementClient, IMapper mapper)
        {
            _auth0ManagementClient = auth0ManagementClient;
            _mapper = mapper;
        }
       
        [HttpGet("getemails")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<List<String>> getAllEmails()
        {
            var users = await _auth0ManagementClient.GetAllUsers();
            var emails = new List<String>();
          
            foreach (User u in users)
            {
                emails.Add( u.Email);
            }
            return emails;
        }
        //vil ha for alle ikke kun for brukeren som er logget inn
        [HttpGet("getmeta")]
        //policy
        public async Task<Dictionary<string, string>> GetMeta()
        {
            var users = await _auth0ManagementClient.GetAllUsers();
            foreach(User u in users)
            {
                var data = await _auth0ManagementClient.GetUserMetadata(u.UserId);
                return data;
            }
            return null;
        }


        [HttpGet("getnicknames")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<List<String>> getAllNicknames()
        {
            var users = await _auth0ManagementClient.GetAllUsers();
            var emails = new List<String>();
            foreach (User u in users)
            {
                emails.Add(u.NickName);
            }
            return emails;
        }


        [HttpPost("create")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<User> CreateUser([FromBody] CreateUserDto content)
        {
            var user = await _auth0ManagementClient.CreateUser(content);

            //legg til permissions.
            return user;
        }

        [HttpGet("getsingle")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<User> GetSingleUser([FromQuery] string email)
        {
            return await _auth0ManagementClient.GetSingleUser(email);
        }

        [HttpDelete("delete")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public void DeleteUser([FromQuery] string email)
        {
            _auth0ManagementClient.DeleteUser(email);

        }
    }
}
