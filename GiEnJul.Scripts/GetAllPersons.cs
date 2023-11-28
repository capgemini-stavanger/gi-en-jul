using Azure;
using Azure.Data.Tables;
using GiEnJul.Entities;

namespace GiEnJul.Scripts;


public class GetAllPersons
{

    [Fact(
        Skip = "GetData"
        )]
    public async Task GetAllPersonsFromDB()
    {
        var settings = ScriptHelpers.CreateSettings();
        var eventName = "Jul23_Halden";

        var recipientClient = new TableClient(settings.TableConnectionString, "Recipient");
        var personClient = new TableClient(settings.TableConnectionString, "Person");

        var q = $"PartitionKey eq '{eventName}'";
        var recipients = recipientClient.Query<Recipient>(q);
        var ind = 0;
        List<AsyncPageable<Person>> personQueryResults = new();
        while (ind < recipients.Count())
        {
            var take = recipients.Skip(ind).Take(30);
            var keys = take.Select(t => $"PartitionKey eq '{t.RowKey}'");
            var personQuery = string.Join(" or ", keys);
            personQueryResults.Add(personClient.QueryAsync<Person>(personQuery));
            ind += take.Count();
        }

        List<Person> persons = new();
        foreach (var result in personQueryResults)
        {
            await foreach (var person in result)
            {
                persons.Add(person);
            }
        }
        var famDict = recipients.ToDictionary(k => k.RowKey, v => v);

        var lines = persons.Select(p =>
        {
            var f = famDict[p.PartitionKey];
            return $"{f.FamilyId}| {f.Institution}| {f.ContactFullName}| {f.ContactEmail}| {p.Age}| {p.Months}| {p.Gender}| {p.Wishes}| {p.NoWish}";
        }).ToList();
        lines.Add("FamilieId| Institusjon| Kontakt| Kontakt epost| Alder år| Alder mnd| Kjønn| Ønsker| Har ikke spesifisert ønske");
        lines.Reverse();
        File.WriteAllLines("./Output.csv", lines);
    }
}
