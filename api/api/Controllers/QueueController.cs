using api.Dtos;
using api.Interfaces;
using api.Models;
using api.SignalRHubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class QueueController : ControllerBase {
        private readonly IQueueRepository queueRepository;
        private readonly ITournamentTableHubSender hubSender;

        public QueueController(IQueueRepository queueRepository, ITournamentTableHubSender hubSender) {
            this.queueRepository = queueRepository;
            this.hubSender = hubSender;
        }

        [HttpPost]
        public async Task<IActionResult> CreateQueues(QueueDto dto) {
            try {
                if (await queueRepository.CreateQueuesAsync(dto.TournamentId, dto.GokartIds, dto.NumberOfRidesInOneGokart))
                {
                    await hubSender.SendUpdate(dto.TournamentId);
                    return Created("",true);
                }
                return BadRequest("Bad request");
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full/tournament/{tournamentId}")]
        public async Task<IActionResult> FullGetAllQuueuesForTournament(int tournamentId) {
            try {
                return Ok(await queueRepository.FullGetAllQueuesForTournamentAsync(tournamentId));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpDelete("{queueId}")]
        public async Task<IActionResult> Remove(int queueId) {
            try {
                if(await queueRepository.RemoveAsync(queueId) is int tournamentId)
                {
                    await hubSender.SendUpdate(tournamentId);
                    return Ok();
                }
                return BadRequest();
            } catch (Exception) {
                return BadRequest();
            }
        }

    }
}
