using GiEnJul.Infrastructure;
using GiEnJul.Utilities.Constants;
using Microsoft.AspNetCore.Http;
using SendGrid.Helpers.EventWebhook;
using Serilog;
using System;
using System.Text;

namespace GiEnJul.Utilities;

public interface ISendGridWebhookVerifier
{
  bool VerifyWebhookSignature(HttpRequest request, string requestBody);
}

public class SendGridWebhookVerifier : ISendGridWebhookVerifier
{
  private readonly string _verificationKey;
  private readonly ILogger _log;

  public SendGridWebhookVerifier(ISettings settings, ILogger log)
  {
    _verificationKey = settings.SendGridWebhookVerificationKey;
    _log = log;
  }

  public bool VerifyWebhookSignature(HttpRequest request, string requestBody)
  {
    if (string.IsNullOrWhiteSpace(_verificationKey))
    {
      _log.Error("SendGrid webhook verification key is not configured");
      return false;
    }

    if (!request.Headers.TryGetValue(RequestValidator.SIGNATURE_HEADER.ToLower(), out var signatureHeader) ||
        !request.Headers.TryGetValue(RequestValidator.TIMESTAMP_HEADER.ToLower(), out var timestampHeader))
    {
      _log.Warning("Missing signature or timestamp headers in webhook request from {RemoteIp}",
          request.HttpContext.Connection.RemoteIpAddress);
      return false;
    }

    var signature = signatureHeader.ToString();
    var timestamp = timestampHeader.ToString();
    var validator = new RequestValidator();

    try
    {
      var formattedKey = FormatBase64KeyWithLineBreaks(_verificationKey);
      var keyWithPemHeaders = $"{WebhookConstants.PEM_HEADER_START}\n{formattedKey}\n{WebhookConstants.PEM_HEADER_END}";
      var publicKey = validator.ConvertPublicKeyToECDSA(keyWithPemHeaders);

      if (!validator.VerifySignature(publicKey, requestBody, signature, timestamp))
      {
        _log.Warning("Invalid signature in webhook request from {RemoteIp}",
            request.HttpContext.Connection.RemoteIpAddress);
        return false;
      }

      _log.Debug("Successfully verified SendGrid webhook signature");
      return true;
    }
    catch (Exception ex)
    {
      _log.Error(ex, "Error verifying webhook signature from {RemoteIp}",
          request.HttpContext.Connection.RemoteIpAddress);
      return false;
    }
  }

  private static string FormatBase64KeyWithLineBreaks(string base64Key)
  {
    var cleanKey = base64Key.Replace("\n", "").Replace("\r", "").Replace(" ", "");
    var formatted = new StringBuilder();

    for (int i = 0; i < cleanKey.Length; i += WebhookConstants.PEM_LINE_LENGTH)
    {
      var length = Math.Min(WebhookConstants.PEM_LINE_LENGTH, cleanKey.Length - i);
      formatted.AppendLine(cleanKey.Substring(i, length));
    }

    return formatted.ToString().TrimEnd('\r', '\n');
  }
}
