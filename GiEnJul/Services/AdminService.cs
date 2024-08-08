using GiEnJul.Repositories;
using GiEnJul.Utilities.ExcelEntries;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Services;

public interface IAdminService
{
    Task<List<MunicipalityOverviewExcel>> GetPersonsDataByEvent(string location, string eventName);
}

public class AdminService(IPersonRepository personRepository, IRecipientRepository recipientRepository) : IAdminService
{
    private readonly IPersonRepository _personRepository = personRepository;
    private readonly IRecipientRepository _recipientRepository = recipientRepository;

    public async Task<List<MunicipalityOverviewExcel>> GetPersonsDataByEvent(string location, string eventName)
    {
        var recipients = await _recipientRepository.GetRecipientsByLocationAsync(eventName, location);
        var recipientIds = recipients.Select(r => r.RecipientId);
        var persons = await _personRepository.GetAllByRecipientIds(recipientIds);
        var recipientDict = recipients.ToDictionary(k => k.RecipientId, v => v);

        var excelPersons = persons.Select(p => new MunicipalityOverviewExcel
        {
            Event = recipientDict[p.RecipientId]?.Event,
            ContactEmail = recipientDict[p.RecipientId]?.ContactEmail,
            ContactName = recipientDict[p.RecipientId]?.ContactFullName,
            ContactPhone = recipientDict[p.RecipientId]?.ContactPhoneNumber,
            SubmitterInstitution = recipientDict[p.RecipientId]?.Institution,
            IsConnectedMatch = recipientDict[p.RecipientId]?.HasConfirmedMatch ?? false,
            IsSuggestedMatch = recipientDict[p.RecipientId]?.IsSuggestedMatch ?? false,
            AgeYears = p.Age,
            AgeMonths = p.Months,
            FamilyId = recipientDict[p.RecipientId]?.FamilyId,
            Gender = p.Gender.ToString(),
            Wishes = p.Wishes,
        }).ToList();

        return excelPersons;
    }
}
