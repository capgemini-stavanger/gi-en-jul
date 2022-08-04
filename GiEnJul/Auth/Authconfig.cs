using Microsoft.AspNetCore.Authorization;

namespace GiEnJul.Auth
{
    public static class Policy
    {
        public const string ReadGiver = "ReadGiver";
        public const string DeleteGiver = "DeleteGiver";
        public const string AddRecipient = "AddRecipient";
        public const string ReadRecipient = "ReadRecipient";
        public const string UpdateRecipient = "UpdateRecipient";
        public const string DeleteRecipient = "DeleteRecipient";
        public const string ReadConnection = "ReadConnection";
        public const string DownloadDeliveryExcel = "DownloadDeliveryExcel";
        public const string AddEvent = "AddEvent";
        public const string UpdateWish = "UpdateWish";
        public const string AddConnection = "AddConnection";
        public const string GetUnsuggestedGivers = "GetUnsuggestedGivers";
        public const string GetUnsuggestedRecipients = "GetUnsuggestedRecipients";
        public const string DeleteConnection = "DeleteConnection";
        public const string PostEmail = "PostEmail";
        public const string SuperAdmin = "SuperAdmin";
        public const string UpdateMunicipality = "UpdateMunicipality";
    }

    public static class Authconfig
    {
        public static void SetPolicies(AuthorizationOptions opt)
        {
            opt.AddPolicy(Policy.ReadGiver, policy => policy.RequireClaim("permissions", "read:giver"));
            opt.AddPolicy(Policy.DeleteGiver, policy => policy.RequireClaim("permissions", "delete:giver"));
            opt.AddPolicy(Policy.AddRecipient, policy => policy.RequireClaim("permissions", "add:recipient"));
            opt.AddPolicy(Policy.ReadRecipient, policy => policy.RequireClaim("permissions", "read:recipient"));
            opt.AddPolicy(Policy.UpdateRecipient, policy => policy.RequireClaim("permissions", "update:recipient"));
            opt.AddPolicy(Policy.DeleteRecipient, policy => policy.RequireClaim("permissions", "delete:recipient"));
            opt.AddPolicy(Policy.ReadConnection, policy => policy.RequireClaim("permissions", "read:connection"));
            opt.AddPolicy(Policy.DownloadDeliveryExcel, policy => policy.RequireClaim("permissions", "download:deliveryexcel"));
            opt.AddPolicy(Policy.AddEvent, policy => policy.RequireClaim("permissions", "add:event"));
            opt.AddPolicy(Policy.UpdateWish, policy => policy.RequireClaim("permissions", "update:wish"));
            opt.AddPolicy(Policy.AddConnection, policy => policy.RequireClaim("permissions", "add:connection"));
            opt.AddPolicy(Policy.GetUnsuggestedGivers, policy => policy.RequireClaim("permissions", "get:unsuggestedgivers"));
            opt.AddPolicy(Policy.GetUnsuggestedRecipients, policy => policy.RequireClaim("permissions", "get:unsuggestedrecipients"));
            opt.AddPolicy(Policy.DeleteConnection, policy => policy.RequireClaim("permissions", "delete:connection"));
            opt.AddPolicy(Policy.PostEmail, policy => policy.RequireClaim("permissions", "post:email"));
            opt.AddPolicy(Policy.SuperAdmin, policy => policy.RequireClaim("permissions", "superadmin"));
            opt.AddPolicy(Policy.UpdateMunicipality, policy => policy.RequireClaim("permissions", "update:municipality"));
        }
    }
}
