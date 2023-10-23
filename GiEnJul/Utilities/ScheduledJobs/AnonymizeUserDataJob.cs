using Azure.Data.Tables;
using GiEnJul.Entities.Anonymized;
using GiEnJul.Infrastructure;
using GiEnJul.Repositories;
using Quartz;
using Serilog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace GiEnJul.Utilities.ScheduledJobs;

public class AnonymizeUserDataJob : IJob
{
    private readonly IEventRepository _eventRepository;
    private readonly ISettings _settings;
    private readonly ILogger _log;

    public AnonymizeUserDataJob(IEventRepository eventRepository, ISettings settings,ILogger log)
    {
        _eventRepository = eventRepository;
        _settings = settings;
        _log = log;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        _log.Information("[AnonymizeUserDataJob] Starting {0}", nameof(AnonymizeUserDataJob));
        var sw = new Stopwatch();
        sw.Start();
        var events = await _eventRepository.GetExpiredEvents();
        var notCompleteEvents = events.Where(e => e.Completed != true && e.EndDate < DateTime.UtcNow.AddDays(-30));

        _log.Information("[AnonymizeUserDataJob] {0} events ended but not completed", notCompleteEvents.Count());
        var partitionKeys = notCompleteEvents.Select(e => $"{e.EventName}_{e.Municipality}");

        var types = new[]
        {
            nameof(AnonymizedConnection),
            nameof(AnonymizedGiver),
            nameof(AnonymizedRecipient),
        };

        var actions = new Dictionary<string, Func<TableClient, string, IEnumerable<ITableEntity>>>
        {
            { "AnonymizedConnection", (tc, pk) => tc.Query<AnonymizedConnection>($"PartitionKey eq '{pk}'") },
            { "AnonymizedGiver", (tc, pk) => tc.Query<AnonymizedGiver>($"PartitionKey eq '{pk}'") },
            { "AnonymizedRecipient", (tc, pk) => tc.Query<AnonymizedRecipient>($"PartitionKey eq '{pk}'") },
        };


        try
        {
            foreach (var typeName in types)
            {
                var sourceClient = new TableClient(_settings.TableConnectionString, typeName.Replace("Anonymized", ""));
                var targetClient = new TableClient(_settings.TableConnectionString, typeName);
                await sourceClient.CreateIfNotExistsAsync();
                await targetClient.CreateIfNotExistsAsync();

                if (typeName == nameof(AnonymizedRecipient))
                {
                    var sourcePersonClient = new TableClient(_settings.TableConnectionString, nameof(AnonymizedPerson).Replace("Anonymized", ""));
                    var targetPersonClient = new TableClient(_settings.TableConnectionString, nameof(AnonymizedPerson));
                    await sourcePersonClient.CreateIfNotExistsAsync();
                    await targetPersonClient.CreateIfNotExistsAsync();

                    foreach (var pk in partitionKeys)
                    {
                        var recipients = actions[typeName](sourceClient, pk);
                        var persons = GetPersons(sourcePersonClient, recipients);

                        var recipientCount = recipients.Count();
                        var personCount = persons.Count();

                        foreach (var a in (IEnumerable<AnonymizedRecipient>)recipients)
                        {
                            a.Comment = null;
                            a.ContactEmail = CreateHash(a.ContactEmail);
                            a.ContactFullName = CreateHash(a.ContactFullName);
                            await targetClient.UpsertEntityAsync(a);
                            await sourceClient.DeleteEntityAsync(a.PartitionKey, a.RowKey);
                        }
                        _log.Information("[AnonymizeUserDataJob] Anonymized {0} {1}", recipientCount, typeName);
                        foreach (var a in (IEnumerable<AnonymizedPerson>)persons)
                        {
                            await targetPersonClient.UpsertEntityAsync(a);
                            await sourcePersonClient.DeleteEntityAsync(a.PartitionKey, a.RowKey);
                        }
                        _log.Information("[AnonymizeUserDataJob] Anonymized {0} {1}", personCount, "AnonymizedPerson");
                    }
                }
                else
                {
                    foreach (var pk in partitionKeys)
                    {
                        var items = actions[typeName](sourceClient, pk);
                        var itemCount = items.Count();
                        switch (typeName)
                        {
                            case nameof(AnonymizedGiver):
                                foreach (var a in (IEnumerable<AnonymizedGiver>)items)
                                {
                                    if (a.RegistrationDate == DateTime.MinValue)
                                        a.RegistrationDate = a.Timestamp.Value.UtcDateTime;
                                    a.Email = CreateHash(a.Email);
                                    await targetClient.UpsertEntityAsync(a);
                                    await sourceClient.DeleteEntityAsync(a.PartitionKey, a.RowKey);
                                }
                                break;
                            case nameof(AnonymizedConnection):
                                foreach (var a in (IEnumerable<AnonymizedConnection>)items)
                                {
                                    await targetClient.UpsertEntityAsync(a);
                                    await sourceClient.DeleteEntityAsync(a.PartitionKey, a.RowKey);
                                }
                                break;
                        }
                        _log.Information("[AnonymizeUserDataJob] Anonymized {0} {1}", itemCount, typeName);
                    }
                }
            }

            foreach (var event_ in notCompleteEvents)
            {
                await _eventRepository.CompleteEvent(event_);
            }
        }
        catch (Exception e)
        {
            _log.Error(e, "[AnonymizeUserDataJob] Error in anonymization job");
            throw;
        }
        sw.Stop();
        _log.Information("[AnonymizeUserDataJob] Job finished in {0}ms", sw.ElapsedMilliseconds);
    }

    private static string CreateHash(string email)
    {
        if (string.IsNullOrEmpty(email))
        {
            return "";
        }
        return Convert.ToBase64String(SHA256.HashData(Encoding.UTF8.GetBytes(email)));
    }

    private static List<AnonymizedPerson> GetPersons(TableClient sourcePersonClient, IEnumerable<ITableEntity> recipients)
    {
        var familyIds = recipients.Select(r => r.RowKey).ToList();
        var persons = new List<AnonymizedPerson>();
        var skip = 0;
        while (skip < familyIds.Count())
        {
            var queryParts = familyIds.Skip(skip).Take(50).Select(f => $"PartitionKey eq '{f}'");
            var query = string.Join(" or ", queryParts);
            var nextPersons = sourcePersonClient.Query<AnonymizedPerson>(query);
            persons.AddRange(nextPersons);
            skip += queryParts.Count();
        }
        return persons;
    }
}
