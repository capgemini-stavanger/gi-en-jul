using AutoMapper.Configuration.Annotations;
using Azure.Data.Tables;
using GiEnJul.Entities;
using GiEnJul.Infrastructure;
using Microsoft.Extensions.Configuration;
using System;
using System.Diagnostics;

namespace GiEnJul.Scripts;

public class GenerateTestData
{
    private static string[] _mailProviders = new[]{ "example.com"};
    private static string[] _institutions = new[]{ "NAV", "BV", "CAP", "Staten", "FKT", "NFF"};


    [Fact(
        Skip = "Generates Data"
        )]
    public async Task Generate()
    {
        var municipalities = new[] { "Stavanger", "Sandnes", "Sola", "Halden"};
        var numberOfGivers = 20; //per municipality
        var numberOfFamilies = 50; //per municipality

        var random = new Random();
        var settings = CreateSettings();
        var municipalityClient = new TableClient(settings.TableConnectionString, "Municipality");
        await municipalityClient.CreateIfNotExistsAsync();
        foreach (var municipality in municipalities)
        {
            var existingMunicipality = municipalityClient.Query<Municipality>($"RowKey eq '{municipality}'");
            if (existingMunicipality == null || !existingMunicipality.Any())
            {
                var responsible = MakeName();
                var newMunicipality = new Municipality { PartitionKey = "Norge", RowKey = municipality, ContactPerson = responsible, Email = responsible.Replace(" ", ".") + "@gienjul.no", IsActive = true };
                await municipalityClient.UpsertEntityAsync(newMunicipality);
            }
        }

        var events = municipalities.Select((m, i) => new Event
            {
                RowKey = m, 
                PartitionKey = $"TestEvent", 
                StartDate = DateTime.UtcNow.AddDays(-50), 
                EndDate = DateTime.UtcNow.AddDays(20 + random.Next(50)), 
                GiverLimit = 200 
            }).ToDictionary(k => k.RowKey, v => v);

        var eventClient = new TableClient(settings.TableConnectionString, "Event");
        foreach (var event_ in events.Values)
        {
            await eventClient.UpsertEntityAsync(event_);
        }

        var givers = municipalities.SelectMany(m => Enumerable.Range(0, numberOfGivers).Select(i => MakeGiver(m, random, events[m])));

        var giverClient = new TableClient(settings.TableConnectionString, "Giver");
        foreach (var giver in givers)
        {
            await giverClient.UpsertEntityAsync(giver);
        }

        var recipientsWithPersons = municipalities.SelectMany(m => Enumerable.Range(0, numberOfFamilies).Select(i => MakeRecipient(random, events[m], i))).ToList();
        var recipients = recipientsWithPersons.Select(r => r.Item1).ToList();
        var persons = recipientsWithPersons.SelectMany(r => r.Item2).ToList();

        var recipientClient = new TableClient(settings.TableConnectionString, "Recipient");
        foreach (var recipient in recipients)
        {
            await recipientClient.UpsertEntityAsync(recipient);
        }

        var personClient = new TableClient(settings.TableConnectionString, "Person");
        foreach (var person in persons)
        {
            await personClient.UpsertEntityAsync(person);
        }

        var all = persons.All(p => recipients.Select(r => r.RowKey).Any(r => r == p.PartitionKey));
    }

    private static (Recipient, IEnumerable<Person>) MakeRecipient(Random random, Event event_, int number)
    {
        var contactName = MakeName();
        var municipality = event_.RowKey;
        var institution = _institutions[random.Next(_institutions.Length)];
        var personCount = random.Next(10)+1;
        var recipientId = Guid.NewGuid().ToString();
        var recipient = new Recipient
        {
            Location = municipality,
            PartitionKey = $"{event_.PartitionKey}_{event_.RowKey}",
            RowKey = recipientId,
            Dinner = "Pinnekj�tt",
            Dessert = "Riskrem",
            EventName = event_.PartitionKey,
            ContactFullName = contactName,
            ContactEmail = contactName.Replace(" ", ".") + $"@{institution}.example.com",
            Institution = institution,
            IsSuggestedMatch = false,
            HasConfirmedMatch = false,
            PersonCount = personCount,
            FamilyId = number.ToString(),
        };
        var persons = Enumerable.Range(1, personCount).Select(i => MakePerson(recipientId, random));
        return (recipient,  persons);
    }

    private static Person MakePerson(string recipientId, Random random)
    {
        var age = random.Next(40);
        var person = new Person
        {
            Age = age,
            Months = age == 0 ? random.Next(12) : 0,
            Gender = random.Next(4) switch 
            { 
                var i when i < 3 =>  i,
                _ => 9
            },
            PartitionKey = recipientId,
            RowKey = Guid.NewGuid().ToString(),
            Wishes = "[\"Alderstilpasset gave�nske\"]",
            NoWish = true,
        };

        return person;
    }

    private static Giver MakeGiver(string municipality, Random random, Event event_)
    {
        var name = MakeName();
        var giver = new Giver
        {
            Email = name.Replace(" ", ".") + "@" + _mailProviders[random.Next(_mailProviders.Length)],
            FullName = name,
            MaxReceivers = random.Next(20) switch
            {
                > 4 and < 10 => 5,
                >= 10 => 99,
                _ => 0
            },
            EventName = event_.PartitionKey,
            PartitionKey = $"{event_.PartitionKey}_{event_.RowKey}",
            RowKey = Guid.NewGuid().ToString(),
            Location = municipality,
            RegistrationDate = DateTime.UtcNow,
        };
        return giver;
    }

    private Settings CreateSettings()
    {
        var path = Path.GetFullPath("..\\..\\..\\..\\GiEnJul");
        var config = new ConfigurationBuilder().SetBasePath(path).AddJsonFile("appsettings.json").Build();
        
        var settings = new Settings(config);
        return settings;
    }

    private static string MakeName(string gender = "none")
    {
        var maleNames = File.ReadAllLines("data/names_male.txt");
        var femaleNames = File.ReadAllLines("data/names_female.txt");
        var lastNames = File.ReadAllLines("data/lastnames.txt");
        var random = new Random();
        var firstName = gender switch
        {
            "male" => maleNames[random.Next(maleNames.Length)],
            "female" => femaleNames[random.Next(femaleNames.Length)],
            _ => random.Next(2) == 0 ? femaleNames[random.Next(femaleNames.Length)] : maleNames[random.Next(maleNames.Length)],
        };
        var lastName = lastNames[random.Next(lastNames.Length)];
        return $"{firstName} {lastName}";
    }
}