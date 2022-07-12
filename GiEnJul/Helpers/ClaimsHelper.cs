using System.Linq;
using System.Security.Claims;

namespace GiEnJul.Helpers
{
    public static class ClaimsHelper
    {
        public static string GetUserId(ClaimsPrincipal user)
        {
            return user.Claims.FirstOrDefault(c => c.Type.Contains("nameidentifier"))?.Value;
        }
    }
}
