using GiEnJul.Utilities.EmailTemplates;
using System;
using System.Collections.Generic;
using System.IO;
using System.Resources;
using System.Threading.Tasks;

namespace GiEnJul.Utilities
{
    public interface IEmailTemplateBuilder
    {
        Task<EmailTemplate> GetEmailTemplate(EmailTemplateName name, Dictionary<string, string> data = default);
    }

    public class EmailTemplateBuilder : IEmailTemplateBuilder
    {
        public EmailTemplateBuilder()
        {

        }

        public async Task<EmailTemplate> GetEmailTemplate(EmailTemplateName name, Dictionary<string, string> data = null)
        {
            if (data == null)
                data = new Dictionary<string, string>();

            var resourceManager = new ResourceManager(typeof(EmailTitles));
            var templatePath = string.Format("{0}Utilities{0}EmailTemplates{0}Files{0}", Path.DirectorySeparatorChar);
            var headerImage = await File.ReadAllTextAsync($"{AppContext.BaseDirectory}{templatePath}familyTop.0ff49710.svg");
            var content = await File.ReadAllTextAsync($"{AppContext.BaseDirectory}{templatePath}{name}.html");

            data.Add("headerImage", headerImage);

            foreach (var item in data)
            {
                content = content.Replace($"{{{item.Key}}}", item.Value);
            }

            return new EmailTemplate
            {
                Content = content,
                Subject = resourceManager.GetString(name.ToString())
            };
        }
    }
}
