using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueueController : ControllerBase
    {
        private readonly IQueueRepository queueRepository;

        public QueueController(IQueueRepository queueRepository)
        {
            this.queueRepository = queueRepository;
        }

        [HttpPost]
        public IActionResult CreateQueues(QueueDto dto)
        {
            if(queueRepository.CreateQueues(dto.TournamentId, dto.GokartIds, dto.NumberOfRidesInOneGokart))
                return Ok();
            return BadRequest("Bad request");
        }

        [HttpGet("{queueId}")]
        public IActionResult Get(int queueId)
        {
            return Ok(queueRepository.Get(queueId));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(queueRepository.GetAll());
        }


        [HttpGet("full")]
        public IActionResult FullGetAll()
        {
            return Ok(queueRepository.FullGetAll());
        }

        [HttpGet("full/tournament/{tournamentId}")]
        public IActionResult FullGetAllQuueuesForTournament(int tournamentId)
        {
            return Ok(queueRepository.FullGetAllQueuesForTournament(tournamentId));
        }

        [HttpGet("full/{queueId}")]
        public IActionResult FullGetAll(int queueId)
        {
            return Ok(queueRepository.FullGet(queueId));
        }

        [HttpDelete("{queueId}")]
        public IActionResult Remove(int queueId)
        {
            return Ok(queueRepository.Remove(queueId));
        }
    }
}
