using AutoMapper;
using GiEnJul.Auth;
using GiEnJul.Dtos;
using GiEnJul.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using GiEnJul.Helpers;
using GiEnJul.Clients;
using GiEnJul.Utilities;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipalityController : ControllerBase
    {
        private readonly IMunicipalityRepository _municipalityRepository;
        private readonly IMapper _mapper;
        private readonly IAuth0ManagementClient _managementClient;
        private readonly IAuthorization _authorization;
        private readonly IMunicipalityBlobClient _municipalityBlobClient;
        private readonly IContactImagesBlobClient _contactImagesBlobClient;

        public MunicipalityController(IMunicipalityRepository municipalityRepository,
                                      IMapper mapper,
                                      IAuth0ManagementClient managementClient,
                                      IAuthorization authorization,
                                      IMunicipalityBlobClient municipalityBlobClient,
                                      IContactImagesBlobClient contactImagesBlobClient)
        {
            _municipalityRepository = municipalityRepository;
            _mapper = mapper;
            _managementClient = managementClient;
            _authorization = authorization;
            _municipalityBlobClient = municipalityBlobClient;
            _contactImagesBlobClient = contactImagesBlobClient;
        }

        [HttpDelete]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> DeleteSingleContent([FromBody] DeleteMunicipalityDto content)
        {
            try
            {
                await _municipalityRepository.DeleteEntry(_mapper.Map<Models.Municipality>(content));
                return Ok();
            }
            catch
            {
                return BadRequest("Could not delete entry");
            }
        }

        [HttpPost]
        [Authorize(Policy = Policy.UpdateMunicipality)]
        public async Task<ActionResult> PostContent([FromBody] PostMunicipalityDto content)
        {
            
            var names = await _municipalityRepository.GetAll();
            if (names.Where(x => x.Name == content.Name).Any())
                return BadRequest("RowKey already exists, use put request to edit");

            await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content));
            return Ok();
        }

        [HttpGet("all")]
        public async Task<List<Dtos.GetMunicipalityDto>> GetAll()
        {
            var municipalities = await _municipalityRepository.GetAll();
            var dtos = _mapper.Map<List<Dtos.GetMunicipalityDto>>(municipalities);
            var images = await _municipalityBlobClient.GetAllImages();

            foreach (var dto in dtos)
            {
                dto.Image = $"{_contactImagesBlobClient.BlobContainerUrl}/{dto.Name}";
                if (images.TryGetValue(dto.Name, out var imgs))
                    dto.Images = imgs ?? new List<string>();
                else
                    dto.Images = new List<string>();
            }

            return dtos;
        }

        [HttpGet("active")]
        public async Task<List<string>> getActiveNames()
        {
            var municipalities = await _municipalityRepository.GetAll();
            var active = municipalities.Where(m => m.IsActive).Select(m => m.Name).ToList();
            return active;
        }

        [HttpGet("names")]
        public async Task<IEnumerable<string>> GetAllNames()
        {
            var municipalities = await _municipalityRepository.GetAll();
            var names = municipalities.Select(m => m.Name);
            return names;
        }

        [HttpGet("email")]
        public async Task<ActionResult<string>> GetEmailForInstitution()
        {
            // Get metadata
            var metadata = await _managementClient.GetUserMetadata(ClaimsHelper.GetUserId(User));
            var location = metadata["location"];

            // Get email
            var municipalityByLocation = await _municipalityRepository.GetEmailByLocation(location);
            if(municipalityByLocation == null)
            {
                return NotFound("Could not find municipality for location: "+location);
            }
            return Ok(municipalityByLocation);
        }

        [HttpGet("allcontacts")]
        public async Task<IEnumerable<Dtos.GetContactsDto>> GetContacts()
        {
            var municipalities = await _municipalityRepository.GetAll();
            var active = municipalities.Where(m => m.IsActive).ToList();
            var contacts = _mapper.Map<List<Dtos.GetContactsDto>>(active);
            contacts.ForEach(c => c.Image = $"{_contactImagesBlobClient.BlobContainerUrl}/{c.Name}");
            return contacts;
        }

        [HttpGet("singlecontact")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<Dtos.GetContactsDto> GetSingleContact([FromQuery] string municipality)
        {
            var contact = await _municipalityRepository.GetSingle(municipality);
            var dto = _mapper.Map<Dtos.GetContactsDto>(contact);
            dto.Image = $"{_contactImagesBlobClient.BlobContainerUrl}/{dto.Name}";
            return dto;
        }

        [HttpGet("getSingle")]
        public async Task<Models.Municipality> GetSingle([FromQuery] string municipality)
        {
            var singelMunicipality = await _municipalityRepository.GetSingle(municipality);
            return _mapper.Map<Models.Municipality>(singelMunicipality);
        }
       
        [HttpPut("update")]
        [Authorize(Policy = Policy.UpdateMunicipality)]
        public async Task<ActionResult> UpdateMunicipalityContent([FromBody] Models.Municipality content)
        {
            await _authorization.ThrowIfNotAccessToMunicipality(content.Name, User);
            var didUpdate = await _municipalityRepository.UpdateMunicipality(content);
            if (didUpdate)
            {
                return Ok();
            }
            else
            {
                return BadRequest("There was a problem updating the municipality");
            }
        }
        
        [HttpPut]
        [Authorize(Policy = Policy.UpdateMunicipality)]
        public async Task<ActionResult> PutContentInfo([FromBody] PostMunicipalityDto content)
        {
            await _authorization.ThrowIfNotAccessToMunicipality(content.Name, User);
            var entities = await _municipalityRepository.GetAll();
            var exsistingMunicipalities = _mapper.Map<List<Models.Municipality>>(entities);
            if (!exsistingMunicipalities.Any(x => x.Name == content.Name))
                return BadRequest("RowKey does not exists");

            await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content));
            return Ok();
        }

        [HttpDelete("image")]
        [Authorize(Policy = Policy.UpdateMunicipality)]
        public async Task<ActionResult> DeleteImage([FromBody] string image)
        {
            var imageName = image.Replace($"{_municipalityBlobClient.BlobContainerUrl}/", "");
            var municipality = imageName.Split('/')[0];

            await _authorization.ThrowIfNotAccessToMunicipality(municipality, User);
            await _municipalityBlobClient.DeleteImageForMunicipality(imageName);

            return Ok();
        }

        [HttpPost("image/{municipalityName}")]
        [Authorize(Policy = Policy.UpdateMunicipality)]
        public async Task<string> UploadImage([FromForm] IFormFile file, string municipalityName)
        {
            await _authorization.ThrowIfNotAccessToMunicipality(municipalityName, User);
            var fileExt = Path.GetExtension(file.FileName);
            var result = await _municipalityBlobClient.UploadImageForMunicipality(municipalityName, file.OpenReadStream(), fileExt);
            return result;
        }

        [HttpPost("contactImage/{municipalityName}")]
        [Authorize(Policy = Policy.UpdateMunicipality)]
        public async Task<string> UploadContactImage([FromForm] IFormFile file, string municipalityName)
        {
            await _authorization.ThrowIfNotAccessToMunicipality(municipalityName, User);
            var result = await _contactImagesBlobClient.UpdateProfileImage(municipalityName, file);
            return result;
        }
    }
}

