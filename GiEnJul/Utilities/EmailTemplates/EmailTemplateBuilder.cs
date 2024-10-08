﻿using GiEnJul.Utilities.EmailTemplates;
using MimeKit;
using MimeKit.Utils;
using Newtonsoft.Json;
using SendGrid.Helpers.Mail;
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
            var imagePath = $"{AppContext.BaseDirectory}{templatePath}family.png";
            var imageContentId = MimeUtils.GenerateMessageId();
            var imgTag = $"<img src=\"cid:{imageContentId}\" style={imageStyle}/>";

            var imageContent = await File.ReadAllBytesAsync(imagePath);
            var sendGridAttachment = new Attachment() 
            { 
                Content = Convert.ToBase64String(imageContent), 
                Filename = Path.GetFileName(imagePath), 
                Type = "image/png", 
                ContentId = imageContentId,
                Disposition = "inline"
            };

            var builder = new BodyBuilder();
            var image = builder.LinkedResources.Add(imagePath);
            image.ContentId = imageContentId;

            foreach (var item in data)
            {
                content = content.Replace($"{{{item.Key}}}", item.Value);
            }

            // Combine
            var htmlContent = GetContent(imgTag, content);

            builder.HtmlBody = htmlContent;

            return new EmailTemplate
            {
                Content = htmlContent,
                Subject = resourceManager.GetString(name.ToString()),
                Body = builder.ToMessageBody(),
                SendGridBody = htmlContent,
                SendGridAttachment = sendGridAttachment,
            };
        }

        private string GetContent(string imgTag, string content) => $"<!DOCTYPE html><html style=\"font-family: verdana, sans-serif;\"><table align=center width=600px><tr><td>{imgTag}</td></tr>{content}</table></html>";
    }
}
