﻿using AutoMapper;
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
        public async Task<ActionResult> PutContent([FromBody] PostMunicipalityDto content)
        {
            var names = await _municipalityRepository.GetAll();
            if (!names.Where(x => x.RowKey == content.Name).Any())
                return BadRequest("RowKey does not exists");

            await _municipalityRepository.InsertOrReplaceAsync(_mapper.Map<Models.Municipality>(content));
            return Ok();
        }

        [HttpGet]
        public async Task<List<Entities.Municipality>> GetAll()
        {
            var municipalities = await _municipalityRepository.GetAll();  
            return _mapper.Map<List<Entities.Municipality>>(municipalities);
        }

        [HttpGet("active")] 
        public async Task<List<string>> getActiveNames()
        {
            var all = await _municipalityRepository.GetAll();
            var active = new List<string>();
            foreach (var municipality in all)
            {
                if (municipality.IsActive)
                {
                    active.Add(municipality.RowKey);
                }
            }
            return active;
        }

        [HttpGet("names")]
        public async Task<List<string>> GetAllNames()
        {
            var entities = await _municipalityRepository.GetAll();
            var names = new List<string>();
            foreach(var entity in entities)
            {
                names.Add(entity.RowKey);
            }
            return names;
        } 
    }
    }
}