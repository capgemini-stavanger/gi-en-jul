using GiEnJul.Clients;
using GiEnJul.Helpers;
using GiEnJul.Infrastructure;
using GiEnJul.Models;
using GiEnJul.Repositories;
using Quartz;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiEnJul.Utilities.ScheduledJobs
{
    public class CleanupConnectionsJob : IJob
    {
        private readonly ILogger _log;
        private readonly ISettings _settings;
        private readonly IEmailClient _emailClient;
        private readonly IEmailTemplateBuilder _templateBuilder;
        private readonly IGiverRepository _giverRepository;
        private readonly IRecipientRepository _recipientRepository;
        private readonly IPersonRepository _personRepository;
        private readonly IMunicipalityRepository _municipalityRepository;

        public CleanupConnectionsJob(ILogger log,
                                     ISettings settings,
                                     IEmailClient emailClient,
                                     IEmailTemplateBuilder templateBuilder,
                                     IGiverRepository giverRepository,
                                     IRecipientRepository recipientRepository,
                                     IPersonRepository personRepository,
                                     IMunicipalityRepository municipalityRepository)
        {
            _log = log;
            _settings = settings;
            _emailClient = emailClient;
            _templateBuilder = templateBuilder;
            _giverRepository = giverRepository;
            _recipientRepository = recipientRepository;
            _personRepository = personRepository;
            _municipalityRepository = municipalityRepository;
        }
        
        public async Task Execute(IJobExecutionContext context)
        {
            _log.Information("[Cleanup Job] Starting Cleanup Connections job");
            var municipalities = await _municipalityRepository.GetAll();

            // TODO: Rewrite this job to work per event and use proximity to enddate of the event to calculate sensitivity
            var daySensitivity = DateTime.Now.Month < 11 || (DateTime.Now.Month == 11 && DateTime.Now.Day < 15) ? 
                _settings.CleanupJob.NormalDaySensitivity : 
                _settings.CleanupJob.EndDaySensitivity;

            var notificationDate = DateTime.Now.AddDays(-daySensitivity);
            var removeConnectionDate = notificationDate.AddDays(-daySensitivity);

            _log.Information($"[Cleanup Job] using date sensitivity {daySensitivity}. " +
                $"Sending a reminder to Givers who were matched before {notificationDate:g}, " +
                $"and removing matches made before {removeConnectionDate:g}.");

            var query = TableQueryFilterHelper.GetStaleGiversQuery(notificationDate);
            var staleGivers = await _giverRepository.GetGiversByQueryAsync(query);
            var recipientIds = staleGivers.Select(g => g.MatchedRecipient);
            var connectedRecipients = await _recipientRepository.GetRecipientsByIdsAsync(recipientIds);

            var giversToRemind = staleGivers.Where(g => g.RemindedAt == null || g.RemindedAt == DateTime.MinValue).ToList();
            var giversToRemove = staleGivers.Where(g => g.SuggestedMatchAt <= removeConnectionDate && g.RemindedAt < notificationDate).ToList();
            var giversToSkip = staleGivers.Except(giversToRemind).Except(giversToRemove).ToList();

            _log.Information("[Cleanup Job] Job tasks: Notify {0}, Removing {1}, " +
                "Skipping {2} givers that have been recently reminded",
                giversToRemind.Count, giversToRemove.Count, giversToSkip.Count);

            await RemindGiver(connectedRecipients, giversToRemind, municipalities);
            await RemoveConnection(connectedRecipients, giversToRemove, municipalities);

            _log.Information("[Cleanup Job] Cleanup Connections job done!");
        }

        private async Task RemoveConnection(IEnumerable<Recipient> connectedRecipients, IEnumerable<Giver> giversToRemove, IEnumerable<Municipality> municipalities)
        {
            _log.Information("[Cleanup Job] Removing {0} stale connections", giversToRemove.Count());

            var removedCount = 0;
            foreach (var giver in giversToRemove)
            {
                try
                {
                    var recipient = connectedRecipients.FirstOrDefault(r => r.RecipientId == giver.MatchedRecipient);
                    giver.CancelFeedback = $"Automatisk frakobling {DateTime.Now:d} da giveren ikke bekreftet etter påminnelse {giver.RemindedAt:d}";
                    giver.CancelDate = DateTime.UtcNow;
                    giver.CancelFamilyId = giver.MatchedFamilyId;
                    UnMatchGiver(giver);
                    await _giverRepository.InsertOrReplaceAsync(giver);
                    if (recipient != null)
                    {
                        UnMatchRecipient(recipient);
                        await _recipientRepository.InsertOrReplaceAsync(recipient);
                    }
                    else
                        _log.Warning("[Cleanup Job] Giver {@0} had no matched recipient, only removing giver");

                    var municipality = municipalities.First(m => m.Name == giver.Location);
                    var emailValuesDictionary = EmailDictionaryHelper.MakeDisconnectEmailContent(giver, recipient, municipality);
                    var emailContent = await _templateBuilder.GetEmailTemplate(EmailTemplates.EmailTemplateName.AutomaticDisconnect, emailValuesDictionary);

                    await _emailClient.SendEmailAsync(giver.Email, giver.FullName, emailContent);

                    removedCount++;
                }
                catch (Exception ex)
                {
                    _log.Error(ex, "[Cleanup Job] Failed to remove connection for giver {@0}", giver);
                }
            }

            _log.Information("[Cleanup Job] removed {0} connections", removedCount);
        }

        private async Task RemindGiver(IEnumerable<Recipient> connectedRecipients, IEnumerable<Giver> giversToNotify, IEnumerable<Municipality> municipalities)
        {
            var connectedRecipientIds = giversToNotify.Select(g => g.MatchedRecipient);
            var connectedRecipientPersons = await _personRepository.GetAllByRecipientIds(connectedRecipientIds);
            var recipientsForGiversToRemind = connectedRecipients.Where(r => connectedRecipientIds.Contains(r.RecipientId)).ToList();

            recipientsForGiversToRemind.ForEach(r => r.FamilyMembers = connectedRecipientPersons.Where(p => p.RecipientId == r.RecipientId).ToList());

            var baseUrl = _settings.ReactAppUri.Split(';').Last();

            _log.Information("[Cleanup Job] Trying to remind {0} givers", giversToNotify.Count());
            var remindedCount = 0;
            foreach (var giver in giversToNotify)
            {
                try
                {
                    var matchedRecipient = connectedRecipients.FirstOrDefault(r => r.RecipientId == giver.MatchedRecipient);
                    if (matchedRecipient == null)
                    {
                        _log.Warning("[Cleanup Job] Giver {@0} had no matched recipient. unmatching...", giver);
                        UnMatchGiver(giver);
                        giver.CancelFeedback = $"Automatisk frakobling {DateTime.Now:d} på grunn av en datafeil: fant ikke tilkoblet familie ref:{giver.MatchedRecipient}, fam id: {giver.MatchedFamilyId}";
                        Log.Warning(giver.CancelFeedback);
                        await _giverRepository.InsertOrReplaceAsync(giver);
                        continue;
                    }
                    var municipality = municipalities.First(m => m.Name == giver.Location);
                    var emailValuesDictionary = EmailDictionaryHelper.MakeVerifyEmailContent(giver, matchedRecipient, municipality, baseUrl);
                    var emailContent = await _templateBuilder.GetEmailTemplate(EmailTemplates.EmailTemplateName.ConnectionReminder, emailValuesDictionary);

                    await _emailClient.SendEmailAsync(giver.Email, giver.FullName, emailContent);
                    
                    giver.RemindedAt = DateTime.UtcNow;
                    var reminderComment = $"Påminnelse autmatisk sent {DateTime.Now}";
                    giver.Comment = string.IsNullOrWhiteSpace(giver.Comment) ? 
                        reminderComment : 
                        string.Format("{0}{1}{2}", giver.Comment, Environment.NewLine, reminderComment);
                    await _giverRepository.InsertOrReplaceAsync(giver);

                    remindedCount++;
                }
                catch (Exception ex)
                {
                    _log.Error(ex, "[Cleanup Job] Failed to notify {@0}", giver);
                }
            }

            _log.Information("[Cleanup Job] Sent reminder to {0}", remindedCount);
        }

        private static void UnMatchRecipient(Recipient recipient)
        {
            recipient.IsSuggestedMatch = false;
            recipient.HasConfirmedMatch = false;
            recipient.MatchedGiver = null;
        }

        private static void UnMatchGiver(Giver giver)
        {
            giver.MatchedRecipient = null;
            giver.HasConfirmedMatch = false;
            giver.MatchedFamilyId = null;
            giver.SuggestedMatchAt = null;
            giver.IsSuggestedMatch = false;
        }
    }
}
