using AutoMapper;
using GiEnJul.Auth;
using GiEnJul.Dtos;
using GiEnJul.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Threading.Tasks;

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CmsController : ControllerBase
    {
        private readonly ICmsRepository _cmsRepository;
        private readonly IMapper _mapper;

        public CmsController(
            ICmsRepository cmsRepository,
            IMapper mapper)
        {
            _cmsRepository = cmsRepository;
            _mapper = mapper;
        }

         [HttpGet("GetAll")]
         public async Task<IEnumerable> GetAllContent([FromQuery] string contentType)
         {
            var content = await _cmsRepository.GetCmsByContentTypeAsync(contentType);
            return content;
         }

        [HttpGet("GetSingle")]
        public async Task<IEnumerable> GetSingleContent([FromQuery] string contentType, string index)
        {
            var content = await _cmsRepository.GetSingleCmsByContentTypeAsync(contentType, index); 
            return content;
        }

        [HttpPost("Insert")]
        [Authorize(Policy = Policy.SuperAdmin)]
        public async Task<ActionResult> PostContent([FromBody] PostCmsDto content)
        {
            if (content.Index == "")
            {
                if (content.ContentType == "FAQ" || content.ContentType == "Bedrift")
                {
                    content.Index = Guid.NewGuid().ToString();
                }
            }
            await _cmsRepository.InsertOrReplaceAsync(_mapper.Map<Models.Cms>(content));
            return Ok();
        }
         
    }
}
