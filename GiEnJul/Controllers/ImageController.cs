using GiEnJul.Clients;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GiEnJul.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ImageController : ControllerBase
{
    private readonly IMunicipalityBlobClient _municipalityBlobClient;
    private readonly IContactImagesBlobClient _contactImagesBlobClient;

    public ImageController(IMunicipalityBlobClient municipalityBlobClient, IContactImagesBlobClient contactImagesBlobClient)
    {
        _municipalityBlobClient = municipalityBlobClient;
        _contactImagesBlobClient = contactImagesBlobClient;
    }

    [HttpGet("contact/{municipality}")]
    public async Task<ActionResult> GetContactImage(string municipality)
    {
        var (imageStream, contentType) = await _contactImagesBlobClient.GetProfileImage(municipality);

        if (contentType == "none")
            return NotFound();

        return File(imageStream, contentType);
    }
}
