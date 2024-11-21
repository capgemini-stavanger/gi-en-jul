using GiEnJul.Dtos;
using GiEnJul.Repositories;
using GiEnJul.Utilities.Constants;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailStatusController : ControllerBase
{
    private readonly IEmailStatusRepository _emailStatusRepository;
    private readonly IRecipientRepository _recipientRepository;
    private readonly IGiverRepository _giverRepository;

    public EmailStatusController(IEmailStatusRepository emailStatusRepository, IRecipientRepository recipientRepository, IGiverRepository giverRepository)
    {
        _emailStatusRepository = emailStatusRepository;
        _recipientRepository = recipientRepository;
        _giverRepository = giverRepository;
    }

    [HttpPost]
    public async Task PostEmailStatus(IEnumerable<PostEmailStatusDto> postEmailStatusesDto)
    {
        foreach (var postEmailStatusDto in postEmailStatusesDto)
        {
            if (string.IsNullOrWhiteSpace(postEmailStatusDto.MessageId) || string.IsNullOrWhiteSpace(postEmailStatusDto.Email) || string.IsNullOrWhiteSpace(postEmailStatusDto.Event))
            {
                return;
            }
            var messageId = postEmailStatusDto.MessageId.Split(".").First();
            var updatedModel = await _emailStatusRepository.UpdateStatus(messageId, postEmailStatusDto.Email, postEmailStatusDto.Event, postEmailStatusDto.Reason);
            
            if (postEmailStatusDto.Event != EmailStatuses.Bounced && postEmailStatusDto.Event != EmailStatuses.Dropped)
            {
                continue;
            }

            if (!string.IsNullOrWhiteSpace(updatedModel.GiverId))
            {
                await _giverRepository.UpdateEmailStatusWarning(updatedModel.GiverId, true);
            }
            if (!string.IsNullOrWhiteSpace(updatedModel.RecipientId))
            {

            }
        }
    }

    [HttpGet("/giver/{giverId}")]
    public async Task<IActionResult> GetEmailStatusesForGiver(string giverId)
    {
        var response = await _emailStatusRepository.GetEmailsByGiverId(giverId);
        if (response == null || !response.Any())
        {
            return NotFound();
        }

        return Ok(response);
    }

    [HttpGet("/recipient/{recipientId}")]
    public async Task<IActionResult> GetEmailStatusesForRecipient(string recipientId)
    {
        var response = await _emailStatusRepository.GetEmailsByRecipientId(recipientId);
        if (response == null || !response.Any())
        {
            return NotFound();
        }

        return Ok(response);
    }
}
