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
    public class MunicipalityController: ControllerBase
    {
        private readonly IMunicipalityRepository _municipalityRepository;
        private readonly IMapper _mapper;

        public MunicipalityController(IMunicipalityRepository municipalityRepository, IMapper mapper)
        {
            _municipalityRepository = municipalityRepository;
            _mapper = mapper;
        }

        [HttpDelete("{rowKey}")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> DeleteSingleContent(string rowKey)
        {
            var content = await _municipalityRepository.DeleteEntry(rowKey);
            if (content == null)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPut]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> PutContent([FromBody] PostMunicipalityDto content)
        {
            var names = await _municipalityRepository.GetAll();
            if (names.Where(x => x.RowKey == content.Name).Any())
                return BadRequest("RowKey already exists, use post request to edit");            
            
            await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content));
            return Ok();
        }

        [HttpPost]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> PostContent([FromBody] PostMunicipalityDto content)
        {
            var names = await _municipalityRepository.GetAll();
            if (!names.Where(x => x.RowKey == content.Name).Any())
                return BadRequest("RowKey does not exists");

            await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content));
            return Ok();
        }
        //denne er ikke så bra, den må bruke lokasjonen til admin brukeren 
        [HttpPost("/information")]
        [Authorize(Policy = Policy.UpdateMunicipality)]
        public async Task<ActionResult> EditInformation([FromBody] PostMunicipalityDto content, string info)
        {
           
            var names = await _municipalityRepository.GetAll();
            if (!names.Where(x => x.RowKey == content.Name).Any())
                return BadRequest("RowKey does not exists");

            var infos = await _municipalityRepository.GetAll();
            try
            {
                await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content.Information == info));
                return Ok();
            }
            catch
            {
                return BadRequest("Could not update information");
            }

        }

        [HttpGet]
        public async Task<List<Entities.Municipality>> GetAll()
        {
            var municipalities = await _municipalityRepository.GetAll();
            return _mapper.Map<List<Entities.Municipality>>(municipalities);
        }

        [HttpGet("active")]
        public async Task<List<Entities.Municipality>> getActive()
        {
            var active = await _municipalityRepository.GetAllActive();
            return active.ToList();

        [HttpPost]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> PostContent([FromBody] PostMunicipalityDto content)
        {
            var names = await _municipalityRepository.GetAll();
            if (!names.Where(x => x.RowKey == content.Name).Any())
                return BadRequest("RowKey does not exists");

            await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content));
            return Ok();
        }
    }
    }
}
