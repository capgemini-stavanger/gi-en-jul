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
        }
    }
}