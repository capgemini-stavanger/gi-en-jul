using GiEnJul.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos.Table;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GiEnJul.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiverController : ControllerBase
    {
        private readonly IGiverRepository _giverRepository;
        private readonly IEventRepository _eventRepository;
        private readonly ILogger _log;

        public GiverController(IGiverRepository giverRepository, IEventRepository eventRepository, ILogger log)
        {
            _giverRepository = giverRepository;
            _eventRepository = eventRepository;
            _log = log;
        }

        
        // POST api/<GiverController>
        [HttpPost]
        public async Task<ActionResult<Entities.Giver>> PostAsync([FromBody] Models.PostGiverDto giver)
        {
            try
            {
                giver.EventName = await _eventRepository.GetActiveEventForLocationAsync(giver.Location);

                _log.Debug("Adding giver object: {@giver}", giver);
                var result = await _giverRepository.InsertOrReplaceAsync(giver);
                _log.Debug("Succesfully added giver: {@0}", result);

                return CreatedAtAction(nameof(result), result);
            }
            catch (ArgumentException ex)
            {
                _log.Error("Location was not specified", ex);
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                _log.Error("Could not find any active event for given location", ex);
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _log.Error("An exception was thrown", ex);
                return StatusCode(500, ex.Message);
            }
        }


        
    }
}
