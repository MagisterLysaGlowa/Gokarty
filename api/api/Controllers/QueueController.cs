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
        public IActionResult Create(QueueDto dto)
        {
            var queue = new Queue
            {
                TournamentId = dto.TournamentId,
                PlayerId = dto.PlayerId,
                QueuePosition = dto.QueuePosition,
                RideStatusId = dto.RideStatusId,
            };
            return Ok(queueRepository.Create(queue));
        }

        [HttpPut("{queueId}")]
        public IActionResult Update(int queueId, QueueDto dto)
        {
            var queue = new Queue
            {
                TournamentId = dto.TournamentId,
                PlayerId = dto.PlayerId,
                QueuePosition = dto.QueuePosition,
                RideStatusId = dto.RideStatusId,
            };
            return Ok(queueRepository.Update(queueId, queue));
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
