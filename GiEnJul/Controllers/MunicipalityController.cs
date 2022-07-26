using AutoMapper;
using GiEnJul.Auth;
using GiEnJul.Dtos;
using GiEnJul.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipalityController : ControllerBase
    {
        private readonly IMunicipalityRepository _municipalityRepository;
        private readonly IMapper _mapper;

        public MunicipalityController(IMunicipalityRepository municipalityRepository, IMapper mapper)
        {
            _municipalityRepository = municipalityRepository;
            _mapper = mapper;
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
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> PostContent([FromBody] PostMunicipalityDto content)
        {
            var names = await _municipalityRepository.GetAll();
            if (names.Where(x => x.RowKey == content.Name).Any())
                return BadRequest("RowKey already exists, use put request to edit");

            await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content));
            return Ok();
        }

        [HttpPut]
        [Authorize(Policy = Policy.UpdateMunicipality)]
        public async Task<ActionResult> PutContentInfo([FromBody] PostMunicipalityDto content)
        {
            var entities = await _municipalityRepository.GetAll();
            var exsistingMunicipalities = _mapper.Map<List<Models.Municipality>>(entities);
            if (!exsistingMunicipalities.Any(x => x.Name == content.Name))
                return BadRequest("RowKey does not exists");

            await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content));
            return Ok();
        }

        [HttpGet("all")]
        public async Task<List<Models.Municipality>> GetAll()
        {
            var municipalities = await _municipalityRepository.GetAll();
            return _mapper.Map<List<Models.Municipality>>(municipalities);
        }

        [HttpGet("active")]
        public async Task<List<string>> getActiveNames()
        {
            var all = await _municipalityRepository.GetAll();
            var municipalities = _mapper.Map<List<Models.Municipality>>(all);
            var active = municipalities.Where(m => m.IsActive).Select(m => m.Name).ToList();
            return active;
        }

        [HttpGet("names")]
        public async Task<IEnumerable<string>> GetAllNames()
        {
            var entities = await _municipalityRepository.GetAll();
            var municipalities = _mapper.Map<List<Models.Municipality>>(entities);
            var names = municipalities.Select(m => m.Name);
            return names;
        }

        [HttpGet("allcontacts")]
        public async Task<IEnumerable<Dtos.GetContactsDto>> GetContacts()
        {
            var entities = await _municipalityRepository.GetAll();
            var active = entities.Where(m => m.IsActive).ToList();
            var contacts = _mapper.Map<List<Dtos.GetContactsDto>>(active);
            return contacts;
        }

        [HttpGet("singlecontact")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<IEnumerable<Dtos.GetContactsDto>> GetSingleContact([FromQuery] string municipality)
        {
            var contact = await _municipalityRepository.GetSingle(municipality);
            var contactDtos = _mapper.Map<List<Dtos.GetContactsDto>>(contact);
            return contactDtos;
        }

        [HttpGet("getSingle")]
        public async Task<IEnumerable<Models.Municipality>> GetSingle([FromQuery] string municipality)
        {
            var singleMuniList = await _municipalityRepository.GetSingle(municipality);
            return _mapper.Map<List<Models.Municipality>>(singleMuniList);
        }
       
        [HttpPut("update")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> UpdateMunicipalityContent([FromBody] Models.Municipality content)
        {
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
    }

}

