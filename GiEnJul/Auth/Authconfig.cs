
using Microsoft.AspNetCore.Authorization;


namespace GiEnJul.Auth

{
    public static class Authconfig
    {
        public static void SetPolicies(AuthorizationOptions opt) {
                opt.AddPolicy("ReadGivers",policy => policy.RequireClaim("permissons","read:givers"));
                opt.AddPolicy("ReadRecipient",policy => policy.RequireClaim("permissons","read:recipient"));
                opt.AddPolicy("AddRecipient",policy => policy.RequireClaim("permissons","add:recipient"));
                opt.AddPolicy("UpdateRecipient",policy => policy.RequireClaim("permissons","update:recipient"));
        }
    }
}