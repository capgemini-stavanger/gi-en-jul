using Microsoft.AspNetCore.Authorization;

namespace GiEnJul.Auth
{
    public static class Authconfig
    {
        public static void SetPolicies(AuthorizationOptions opt)
        {
            opt.AddPolicy("ReadGiver", policy => policy.RequireClaim("permissions", "read:giver"));
            opt.AddPolicy("DeleteGiver", policy => policy.RequireClaim("permissions", "delete:giver"));
            opt.AddPolicy("AddRecipient", policy => policy.RequireClaim("permissions", "add:recipient"));
            opt.AddPolicy("ReadRecipient", policy => policy.RequireClaim("permissions", "read:recipient"));
            opt.AddPolicy("UpdateRecipient", policy => policy.RequireClaim("permissions", "update:recipient"));
            opt.AddPolicy("DeleteRecipient", policy => policy.RequireClaim("permissions", "delete:recipient"));
            opt.AddPolicy("ReadConnection", policy => policy.RequireClaim("permissions", "read:connection"));
            opt.AddPolicy("DownloadDeliveryExcel", policy => policy.RequireClaim("permissions", "download:deliveryexcel"));
            opt.AddPolicy("AddEvent", policy => policy.RequireClaim("permissions", "add:event"));
            opt.AddPolicy("UpdateWish", policy => policy.RequireClaim("permissions", "update:wish"));
            opt.AddPolicy("AddConnection", policy => policy.RequireClaim("permissions", "add:connection"));
            opt.AddPolicy("GetUnsuggestedGivers", policy => policy.RequireClaim("permissions", "get:unsuggestedgivers"));
            opt.AddPolicy("GetUnsuggestedRecipients", policy => policy.RequireClaim("permissions", "get:unsuggestedrecipients"));
        }
    }
}
