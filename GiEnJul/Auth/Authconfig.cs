using Microsoft.AspNetCore.Authorization;

namespace GiEnJul.Auth
{
    public static class Authconfig
    {
        public static void SetPolicies(AuthorizationOptions opt)
        {
            opt.AddPolicy("ReadGivers", policy => policy.RequireClaim("permissions", "read:givers"));
            opt.AddPolicy("ReadRecipient", policy => policy.RequireClaim("permissions", "read:recipient"));
            opt.AddPolicy("UpdateRecipient", policy => policy.RequireClaim("permissions", "update:recipient"));
            opt.AddPolicy("AddRecipient", policy => policy.RequireClaim("permissions", "add:recipient"));
        }
    }
}