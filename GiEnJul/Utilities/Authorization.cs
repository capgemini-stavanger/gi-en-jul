using GiEnJul.Clients;
using GiEnJul.Exceptions;
using GiEnJul.Helpers;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GiEnJul.Utilities
{
    public interface IAuthorization
    {
        Task<bool> HasAccessToMunicipality(string municipality, ClaimsPrincipal user);
        Task ThrowIfNotAccessToMunicipality(string municipality, ClaimsPrincipal user);
    }
    public class Authorization : IAuthorization
    {
        private readonly IAuth0ManagementClient _managementClient;

        public Authorization(IAuth0ManagementClient managementClient)
        {
            _managementClient = managementClient;
        }

        public async Task<bool> HasAccessToMunicipality(string municipality, ClaimsPrincipal user)
        {
            var userId = ClaimsHelper.GetUserId(user);
            var metadata = await _managementClient.GetUserMetadata(userId);
            if (metadata["role"] == "SuperAdmin")
            {
                return true;
            }
            return metadata["location"] == municipality;
        }

        public async Task ThrowIfNotAccessToMunicipality(string municipality, ClaimsPrincipal user)
        {
            if (!await HasAccessToMunicipality(municipality, user))
                throw new UnauthorizedException();
        }
    }
}
