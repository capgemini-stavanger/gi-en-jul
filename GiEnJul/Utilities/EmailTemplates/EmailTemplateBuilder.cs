using GiEnJul.Utilities.EmailTemplates;
using Newtonsoft.Json;
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

            // Read HTML
            var resourceManager = new ResourceManager(typeof(EmailTitles));
            var templatePath = string.Format("{0}Utilities{0}EmailTemplates{0}Files{0}", Path.DirectorySeparatorChar);
            var content = await File.ReadAllTextAsync($"{AppContext.BaseDirectory}{templatePath}{name}.html");

            // Read CSS
            StreamReader r = new StreamReader($"{AppContext.BaseDirectory}{templatePath}EmailCssStyles.json");
            string jsonString = r.ReadToEnd();
            var styles = JsonConvert.DeserializeObject<Dictionary<string, string[]>>(jsonString);

           // Unused for now var bodyStyle = $"\"{string.Join("", styles["Body"])}\"";
            var imageStyle = $"\"{string.Join("", styles["Image"])}\"";
            
            // Read Image
            var imgFile = await File.ReadAllBytesAsync($"{AppContext.BaseDirectory}{templatePath}family.png");
            var imgString = Convert.ToBase64String(imgFile);
            var img = $"<img src=\"data:image/png;base64,{imgString}\" style={imageStyle}/>";

            var center = "center";
            var widht = "600px";

            // Combine
            content = $"<!DOCTYPE html><html><table align={center} width={widht}><tr><td>{img}</td></tr>{content}</table></html>";

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
