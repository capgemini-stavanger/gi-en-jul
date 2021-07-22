﻿using AutoMapper;
using GiEnJul.Dtos;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;
using GiEnJul.Clients;
using GiEnJul.Models;
using GiEnJul.Dtos;
using Microsoft.AspNetCore.Authorization;
using GiEnJul.Repositories;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly IGiverRepository _giverRepository;
        private readonly IRecipientRepository _recipientRepository;
        private readonly IPersonRepository _personRepository;
        private readonly IConnectionRepository _connectionRepository;
        private readonly ILogger _log;
        private readonly IMapper _mapper;
        private readonly IEmailClient _emailClient;

        public AdminController(IEventRepository eventRepository, IGiverRepository giverRepository, IRecipientRepository recipientRepository, IPersonRepository personRepository, IConnectionRepository connectionRepository, ILogger log, IMapper mapper, IEmailClient emailClient)
        {
            _eventRepository = eventRepository;
            _giverRepository = giverRepository;
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _connectionRepository = connectionRepository;
            _log = log;
            _mapper = mapper;
            _emailClient = emailClient;
        }
        //The function below is not in use now, but should be implemented later:
        // Need to add an appropriate routing for the api call below. 
        // [HttpGet]
        // public async Task<List<Models.Recipient>> GetUnmatchedRecipientsAsync(string location) {
        //     var currentEvent = await _eventRepository.GetActiveEventForLocationAsync(location);
        // return await _recipientRepository.GetUnmatchedRecipientsAsync(location, currentEvent);
        // }

        [HttpGet("givers")]
        // [Authorize(Policy = "ReadGiver")] This will deny any unauthorized requests, but will break the application atm
        public async Task<IEnumerable<Giver>> GetGiversAsync()
        {
            return await _giverRepository.GetAllAsModelAsync();
            // return await _giverRepository.GetAllAsync().OrderBy(x => x.FullName).ToList();
        }
        [HttpGet("recipients")]
        public async Task<List<Recipient>> GetRecipientsAsync()
        {
            var recipients = await _recipientRepository.GetAllAsModelAsync();
            foreach (var recipient in recipients)
            {
                var familyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
                recipient.FamilyMembers = familyMembers;
            }
            return recipients;
        }
        [HttpPost]
        public async Task<ActionResult> PostConnectionAsyc([FromBody] PostConnectionDto connectionDto)
        {
            var giver = await _giverRepository.GetGiverAsync(connectionDto.GiverPartitionKey, connectionDto.GiverRowKey);
            var recipient = await _recipientRepository.GetRecipientAsync(connectionDto.RecipientPartitionKey, connectionDto.RecipientRowKey);
            recipient.FamilyMembers = await _personRepository.GetAllByRecipientId(recipient.RowKey);
            (string partitionKey, string rowKey) connection = await _connectionRepository.InsertOrReplaceAsync(giver, recipient);
            giver.IsSuggestedMatch = true;
            giver.MatchedRecipient = connectionDto.RecipientRowKey;
            recipient.IsSuggestedMatch = true;
            recipient.MatchedGiver = connectionDto.GiverRowKey;
            try
            {
                await _giverRepository.InsertOrReplaceAsync(giver);
                await _recipientRepository.InsertOrReplaceAsync(recipient);
            }
            catch (System.Exception e)
            {
                await _connectionRepository.DeleteConnectionAsync(connection.partitionKey, connection.rowKey);
                giver.IsSuggestedMatch = false;
                giver.MatchedRecipient = "";
                recipient.IsSuggestedMatch = false;
                recipient.MatchedGiver = "";
                await _giverRepository.InsertOrReplaceAsync(giver);
                await _recipientRepository.InsertOrReplaceAsync(recipient);
                throw e;
            }
            return Ok();
        }

        [HttpDelete("recipient")]
        [Authorize(Policy = "DeleteRecipient")]
        public async Task<ActionResult> DeleteRecipientAsync([FromBody] DeleteRecipientDto recipientDto)
        {
            var recipientToDelete = await _recipientRepository.GetRecipientAsync(recipientDto.PartitionKey, recipientDto.RowKey);
            var deletedRecipient = await _recipientRepository.DeleteAsync(recipientToDelete);
            return Ok();
        }

        [HttpDelete("giver")]
        [Authorize(Policy = "DeleteGiver")]
        public async Task<ActionResult> DeleteGiverAsync([FromBody] DeleteGiverDto giverDto)
        {
            var giverToDelete = await _giverRepository.GetGiverAsync(giverDto.PartitionKey, giverDto.RowKey);
            var deletedGiver = await _giverRepository.DeleteAsync(giverToDelete);
            return Ok();
        }
    }
}
