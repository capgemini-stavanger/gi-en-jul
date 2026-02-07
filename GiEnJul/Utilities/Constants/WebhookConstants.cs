namespace GiEnJul.Utilities.Constants;

public static class WebhookConstants
{
  public const string PEM_HEADER_START = "-----BEGIN PUBLIC KEY-----";
  public const string PEM_HEADER_END = "-----END PUBLIC KEY-----";
  public const int PEM_LINE_LENGTH = 64;
  public const char MESSAGE_ID_SEPARATOR = '.';

  public static readonly string[] WarningStatuses =
  [
    EmailStatuses.Bounced,
    EmailStatuses.Dropped,
    EmailStatuses.Deferred
  ];
}
