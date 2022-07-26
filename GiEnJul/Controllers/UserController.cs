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

        //to do:
        //delete user
        
        private readonly IAuth0ManagementClient _auth0ManagementClient;
        private readonly IMapper _mapper;

        public UserController(IAuth0ManagementClient auth0ManagementClient, IMapper mapper)
        {
            _auth0ManagementClient = auth0ManagementClient;
            _mapper = mapper;
        }
       
        [HttpGet("getallemails")]
       // [Authorize(Policy = Policy.SuperAdmin)]
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

        [HttpGet("getallnicknames")]
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


        [HttpGet("getmeta")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<List<string>> getAllMeta()
        {
            var users = await _auth0ManagementClient.GetAllUsers();
            var meta = new List<String>();
            foreach (User u in users)
            {
                meta.Add(u.UserMetadata);
            }
            return meta;
        }


        [HttpPost("create")]
       // [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<User> CreateUser([FromBody] CreateUserDto content)
        {
            var user = await _auth0ManagementClient.CreateUser(content);

            //legg til permissions.
            return user;
            
        }

        [HttpDelete]
        //policy
        public void DeleteUser([FromBody] string email)
        {
             _auth0ManagementClient.DeleteUser(email);

        }

    }
}
