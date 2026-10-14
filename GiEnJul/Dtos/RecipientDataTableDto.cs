using GiEnJul.Models;
using System.Collections.Generic;

namespace GiEnJul.Dtos;

public class RecipientDataTableDto
{
    public string RecipientId { get; set; } = null!;
    public string Event { get; set; } = null!;

    public string Dinner { get; set; } = null!;
    public string Dessert { get; set; } = null!;
    public string? Note { get; set; }
    public string? FamilyId { get; set; }

    public string ContactFullName { get; set; } = null!;
    public string? ContactEmail { get; set; }
    public string? ContactPhoneNumber { get; set; }

    public string Institution { get; set; } = null!;
    public string? ReferenceId { get; set; }

    public List<PersonDataTableDto> FamilyMembers { get; set; } = [];
    public bool EmailStatusWarning { get; set; } = false;

    public class PersonDataTableDto
    {
        public string PersonId { get; set; } = null!;
        public IEnumerable<string> Wishes { get; set; } = [];
        public int Age { get; set; }
        public Gender Gender { get; set; }
        public bool NoWish { get; set; }
    }
}
