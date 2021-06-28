using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiverController : ControllerBase
    {
        private readonly IGiverRepository _giverRepository;
        private readonly ILogger _log;

        public GiverController(IGiverRepository giverRepository, ILogger log)
        {
            _giverRepository = giverRepository;
            _log = log;
        }

        
        // POST api/<GiverController>
        [HttpPost]
        public async Task<ActionResult<Entities.Giver>> PostAsync([FromBody] Models.Giver giver)
        {   
            _log.Debug("Adding giver object: {@giver}", giver);
            var result = await _giverRepository.InsertOrReplaceAsync(giver);
            _log.Debug("Succesfully added giver: {@0}", result);
            return CreatedAtAction(nameof(result), result);
        }
        
    }
}
