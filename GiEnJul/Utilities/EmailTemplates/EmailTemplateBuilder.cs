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
            var content = await File.ReadAllTextAsync($"{AppContext.BaseDirectory}{templatePath}{name}.html");

            // Read style, apply to body
            string[] emailCSS = { // Read from css file instead
                "background-color: rgb(224, 243, 244);",
                "color: rgba(0, 0, 0, 0.54);",
                "max-width: 70em;",
                "padding: 15px;",
                "margin: auto;",

            };
            var emailStyle = $"\"{string.Join("", emailCSS)}\"";

            // Read image
            var imgFile = await File.ReadAllBytesAsync($"{AppContext.BaseDirectory}{templatePath}familyTop.png");
            var imgString = Convert.ToBase64String(imgFile);
            var img = $"<img src=\"data:image/png;base64,{imgString}\"/>";

            // Combine
            content = $"<!DOCTYPE html><html><div style={emailStyle}>{img}{content}</div></ html>";

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
