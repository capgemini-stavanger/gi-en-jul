﻿using GiEnJul.Helpers;
using GiEnJul.Models;
using GiEnJul.Utilities;
using GiEnJul.Utilities.EmailTemplates;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using Xunit;

namespace GiEnJul.Test.UtilTests
{
    public class EmailTemplateBuilderTests : IDisposable
    {
        public EmailTemplateBuilderTests()
        {
            SUT = new EmailTemplateBuilder();
        }

        public EmailTemplateBuilder SUT { get; private set; }

        public void Dispose(){}

        [Fact]
        public async Task AssignedFamilyTemplate_ReplacesAllFields()
        {
            var data = new Dictionary<string, string>() 
            { 
                { "familyTable", string.Empty },
                { "verifyLink", string.Empty },
                { "recipientNote", string.Empty }
            };
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Giver(), "giver."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Event(), "eventDto."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Municipality(), "municipalityDto."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Recipient(), "recipient."));

            var result = await SUT.GetEmailTemplate(EmailTemplateName.AssignedFamily, data);
            Assert.False(string.IsNullOrEmpty(result.Subject));
            Assert.False(string.IsNullOrEmpty(result.Content));

            Assert.False(result.Content.Contains('{') || result.Content.Contains('}'));
        }

        [Fact]
        public async Task RegisteredTemplate_ReplacesAllFields()
        {
            var data = new Dictionary<string, string>()
            {
                { "familyRange", string.Empty }
            };
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Giver(), "giver."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Event(), "eventDto."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Municipality(), "municipalityDto."));

            var result = await SUT.GetEmailTemplate(EmailTemplateName.Registered, data);
            Assert.False(string.IsNullOrEmpty(result.Subject));
            Assert.False(string.IsNullOrEmpty(result.Content));

            Assert.False(result.Content.Contains('{') || result.Content.Contains('}'));
        }

        [Fact]
        public async Task WaitingListTemplate_ReplacesAllFields()
        {
            var data = new Dictionary<string, string>()
            {
                { "familyRange", string.Empty }
            };
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Giver(), "giver."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Event(), "eventDto."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Municipality(), "municipalityDto."));

            var result = await SUT.GetEmailTemplate(EmailTemplateName.WaitingList, data);
            Assert.False(string.IsNullOrEmpty(result.Subject));
            Assert.False(string.IsNullOrEmpty(result.Content));

            Assert.False(result.Content.Contains('{') || result.Content.Contains('}'));
        }

        [Fact]
        public async Task VerifyConnectionTemplate_ReplaceAllFields()
        {
            var data = new Dictionary<string, string>
            {
                { "verifyLink", string.Empty },
                { "denyLink", string.Empty },
                { "familyTable", string.Empty },
            };
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Giver(), "giver."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Recipient(), "recipient."));

            var result = await SUT.GetEmailTemplate(EmailTemplateName.VerifyConnection, data);
            Assert.False(string.IsNullOrEmpty(result.Subject));
            Assert.False(string.IsNullOrEmpty(result.Content));

            Assert.False(result.Content.Contains('{') || result.Content.Contains('}'));
        }

        [Fact]
        public async Task NotificationTemplate_ReplaceAllFields()
        {
            var data = new Dictionary<string, string>()
            {
                { "content", string.Empty },
                {"fromemail", string.Empty }
            };

            var result = await SUT.GetEmailTemplate(EmailTemplateName.Notification, data);
            Assert.False(string.IsNullOrEmpty(result.Subject));
            Assert.False(string.IsNullOrEmpty(result.Content));

            Assert.False(result.Content.Contains('{') || result.Content.Contains('}'));
        }

        [Fact]
        public async Task ConnectionDeniedTemplate_ReplaceAllFields()
        {
            var data = new Dictionary<string, string>()
            {
                { "content", string.Empty }
            };
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Giver(), "giver."));
            data.AddDictionary(ObjectToDictionaryHelper.MakeStringValueDict(new Municipality(), "municipalityDto."));

            var result = await SUT.GetEmailTemplate(EmailTemplateName.ConnectionDenied, data);
            Assert.False(string.IsNullOrEmpty(result.Subject));
            Assert.False(string.IsNullOrEmpty(result.Content));

            Assert.False(result.Content.Contains('{') || result.Content.Contains('}'));
        }
    }
}
