using GiEnJul.Utilities.ExcelClasses;
using System.Collections.Generic;
using System.Collections.Specialized;

namespace GiEnJul.Utilities.ExcelEntries;

public class MunicipalityOverviewExcel : IExcel
{
    public string Event { get; set; }
    public string ContactEmail { get; set; }
    public string ContactName { get; set; }
    public string ContactPhone { get; set; }
    public string SubmitterInstitution { get; set; }
    public string FamilyId { get; set; }
    public int AgeYears { get; set; }
    public int AgeMonths { get; set; }
    public string Gender { get; set; }
    public IEnumerable<string> Wishes { get; set; }
    public bool IsConnectedMatch { get; set; }
    public bool IsSuggestedMatch { get; set; }

    public OrderedDictionary AsOrderedDictionary()
    {
        return new()
        {
            ["Event/Kommune"] = Event,
            ["Kontakt Epost"] = ContactEmail,
            ["Kontakt Navn"] = ContactName,
            ["Kontakt Telefon"] = ContactPhone,
            ["Organisasjon"] = SubmitterInstitution,
            ["Foreslått kobling"] = IsSuggestedMatch ? "Ja" : "Nei",
            ["Bekreftet kobling"] = IsConnectedMatch ? "Ja" : "Nei",
            ["Familie ID"] = FamilyId,
            ["Alder (År)"] = AgeYears,
            ["Alder (Mnd)"] = AgeMonths,
            ["Kjønn"] = Gender,
            ["Ønsker"] = $"[{string.Join(",", Wishes)}]",
        };
    }
}
