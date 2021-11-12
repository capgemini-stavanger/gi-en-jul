using GiEnJul.Utilities.EmailTemplates;
using System;
using System.Collections.Generic;
using System.IO;
using System.Resources;
using System.Threading.Tasks;

namespace GiEnJul.Utilities
{
    public static class EmailTemplateHandler
    {
        public static async Task<string> GetEmailContent(EmailTemplate template, Dictionary<string, string> data)
        {
            var headerImage = await File.ReadAllTextAsync($"{AppContext.BaseDirectory}\\Utilities\\EmailTemplates\\familyTop.0ff49710.svg");
            data.Add("headerImage", headerImage);

            var content = await File.ReadAllTextAsync($"{AppContext.BaseDirectory}\\Utilities\\EmailTemplates\\{template}.html");
            
            foreach (var item in data)
            {
                content = content.Replace($"{{{item.Key}}}", item.Value);
            }

            return content;
        }

        public static string GetEmailTitle(EmailTemplate template)
        {
            var rm = new ResourceManager(typeof(EmailTitles));
            return rm.GetString(template.ToString());
        }
    }
}
