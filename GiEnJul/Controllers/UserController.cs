using GiEnJul.Clients;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Auth0.ManagementApi.Models;
using System;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        //to do:
        //delete user
        //add user 
        //get single user ? 


        private readonly IAuth0ManagementClient _auth0ManagementClient;
        private readonly IMapper _mapper;

        public UserController(IAuth0ManagementClient auth0ManagementClient, IMapper mapper)
        {
            _auth0ManagementClient = auth0ManagementClient;
            _mapper = mapper;
        }
       
        [HttpGet("getallemails")]
        //add policy superadmin 
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
        //add policy superadmin 
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
    }
}
