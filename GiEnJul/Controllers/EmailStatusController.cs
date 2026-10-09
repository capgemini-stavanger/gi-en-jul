using GiEnJul.Auth;
using GiEnJul.Dtos;
using GiEnJul.Dtos.Mappers;
using GiEnJul.Infrastructure;
using GiEnJul.Repositories;
using GiEnJul.Utilities;
using GiEnJul.Utilities.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiEnJul.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailStatusController : ControllerBase
{
    private readonly IEmailStatusRepository _emailStatusRepository;
    private readonly IRecipientRepository _recipientRepository;
    private readonly IGiverRepository _giverRepository;
    private readonly ISendGridWebhookVerifier _webhookVerifier;
    private readonly ILogger _log;

    public EmailStatusController(
        IEmailStatusRepository emailStatusRepository,
        IRecipientRepository recipientRepository,
        IGiverRepository giverRepository,
        ISendGridWebhookVerifier webhookVerifier,
        ILogger log)
    {
        _emailStatusRepository = emailStatusRepository;
        _recipientRepository = recipientRepository;
        _giverRepository = giverRepository;
        _webhookVerifier = webhookVerifier;
        _log = log;
    }

    [HttpPost]
    public async Task<IActionResult> PostEmailStatus()
    {
        Request.EnableBuffering();
        Request.Body.Position = 0;

        using var reader = new StreamReader(Request.Body, Encoding.UTF8, leaveOpen: true);
        var requestBody = await reader.ReadToEndAsync();
        Request.Body.Position = 0;

        if (!_webhookVerifier.VerifyWebhookSignature(Request, requestBody))
        {
            return Unauthorized("Invalid signature or missing required headers");
        }

        IEnumerable<PostEmailStatusDto> postEmailStatusesDto;
        try
        {
            var settings = new JsonSerializerSettings
            {
                Error = (sender, args) =>
                {
                    _log.Warning("JSON deserialization error: {Error}", args.ErrorContext.Error.Message);
                    args.ErrorContext.Handled = true;
                }
            };

            postEmailStatusesDto = JsonConvert.DeserializeObject<IEnumerable<PostEmailStatusDto>>(requestBody, settings)
                ?? Enumerable.Empty<PostEmailStatusDto>();
        }
        catch (JsonException ex)
        {
            _log.Error(ex, "Failed to deserialize webhook request body");
            return BadRequest($"Invalid request body: {ex.Message}");
        }
        catch (Exception ex)
        {
            _log.Error(ex, "Unexpected error processing request body");
            return BadRequest($"Error processing request body: {ex.Message}");
        }

        if (!postEmailStatusesDto.Any())
        {
            _log.Information("Received empty webhook payload");
            return Ok();
        }

        var processedCount = 0;
        var errorCount = 0;

        foreach (var postEmailStatusDto in postEmailStatusesDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(postEmailStatusDto.MessageId) ||
                    string.IsNullOrWhiteSpace(postEmailStatusDto.Email) ||
                    string.IsNullOrWhiteSpace(postEmailStatusDto.Event))
                {
                    _log.Warning("Skipping webhook event with missing required fields. MessageId: {MessageId}, Email: {Email}, Event: {Event}",
                        postEmailStatusDto.MessageId, postEmailStatusDto.Email, postEmailStatusDto.Event);
                    continue;
                }

                var messageId = postEmailStatusDto.MessageId.Contains(WebhookConstants.MESSAGE_ID_SEPARATOR)
                    ? postEmailStatusDto.MessageId.Substring(0, postEmailStatusDto.MessageId.IndexOf(WebhookConstants.MESSAGE_ID_SEPARATOR))
                    : postEmailStatusDto.MessageId;

                var updatedModel = await _emailStatusRepository.UpdateStatus(
                    messageId,
                    postEmailStatusDto.Email.ToLower(),
                    postEmailStatusDto.Event,
                    postEmailStatusDto.Reason);

                if (WebhookConstants.WarningStatuses.Contains(postEmailStatusDto.Event))
                {
                    var updateTasks = new List<Task>();

                    if (!string.IsNullOrWhiteSpace(updatedModel?.GiverId))
                    {
                        updateTasks.Add(_giverRepository.UpdateEmailStatusWarning(updatedModel.GiverId, true));
                    }

                    if (!string.IsNullOrWhiteSpace(updatedModel?.RecipientId))
                    {
                        updateTasks.Add(_recipientRepository.UpdateEmailStatusWarning(updatedModel.RecipientId, true));
                    }

                    if (updateTasks.Any())
                    {
                        await Task.WhenAll(updateTasks);
                    }
                }

                processedCount++;
            }
            catch (Exception ex)
            {
                errorCount++;
                _log.Error(ex, "Error processing webhook event. MessageId: {MessageId}, Email: {Email}, Event: {Event}",
                    postEmailStatusDto.MessageId, postEmailStatusDto.Email, postEmailStatusDto.Event);
            }
        }

        _log.Information("Processed webhook: {ProcessedCount} successful, {ErrorCount} errors out of {TotalCount} events",
            processedCount, errorCount, postEmailStatusesDto.Count());

        return Ok();
    }


    [HttpPost("clearwarning")]
    [Authorize(Policy = Policy.ReadGiver)]
    public async Task ClearEmailStatusWarning(PostClearEmailWarningDto clearWarningDto)
    {

        if (!string.IsNullOrWhiteSpace(clearWarningDto.GiverId))
        {
            await _giverRepository.UpdateEmailStatusWarning(clearWarningDto.GiverId, false);
        }
        if (!string.IsNullOrWhiteSpace(clearWarningDto.RecipientId))
        {
            await _recipientRepository.UpdateEmailStatusWarning(clearWarningDto.RecipientId, false);
        }
    }

    [HttpGet("giver/{giverId}")]
    [Authorize(Policy = Policy.ReadGiver)]
    public async Task<IActionResult> GetEmailStatusesForGiver(string giverId)
    {
        var response = await _emailStatusRepository.GetEmailsByGiverId(giverId);
        if (response == null || !response.Any())
        {
            return NotFound();
        }

        return Ok(response.OrderByDescending(r => r.SentAt).Select(r => r.ToResponseDto()));
    }

    [HttpGet("recipient/{recipientId}")]
    [Authorize(Policy = Policy.ReadRecipient)]
    public async Task<IActionResult> GetEmailStatusesForRecipient(string recipientId)
    {
        var response = await _emailStatusRepository.GetEmailsByRecipientId(recipientId);
        if (response == null || !response.Any())
        {
            return NotFound();
        }

        return Ok(response.OrderByDescending(r => r.SentAt).Select(r => r.ToResponseDto()));
    }
}
