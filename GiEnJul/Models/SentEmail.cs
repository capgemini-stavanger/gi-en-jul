using System;

namespace GiEnJul.Models;

public class SentEmail
{
    public string Email { get; set; } = null!; //PK
    public string MessageId { get; set; } = null!; //RK
    public string? GiverId {  get; set; }
    public string? RecipientId {  get; set; }
    public string Title { get; set; } = null!;
    public DateTimeOffset SentAt { get; set; } = DateTimeOffset.UtcNow;
    public bool Processed { get; set; } = false;
    public bool Delivered { get; set; } = false;
    public bool Opened { get; set; } = false;
    public bool Dropped { get; set; } = false;
    public bool Deferred { get; set; } = false;
    public bool Bounced { get; set; } = false;
    public string? Reason { get; set; }
    public bool HasError => Dropped || Bounced;
}
