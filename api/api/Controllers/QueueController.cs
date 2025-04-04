using api.Dtos;
using api.Helpers;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> Create(QueueDto dto) {
            try {
                await queueRepository.CreateAsync(dto.TournamentId, dto.GokartIds, dto.NumberOfRidesInOneGokart);
                await hubSender.SendUpdate(dto.TournamentId);
                return StatusCode(201, new ResponseHelper(201, "Created", "Pomyślnie utworzono kolejkę"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("tournament/{tournamentId}")]
        public async Task<IActionResult> GetAllForTournament(int tournamentId) {
            try {
                return Ok(await queueRepository.GetAllForTournamentAsync(tournamentId));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("{queueId}")]
        public async Task<IActionResult> Remove(int queueId) {
            try {
                if(await queueRepository.RemoveAsync(queueId) is int tournamentId)
                {
                    await hubSender.SendUpdate(tournamentId);
                    return StatusCode(200, new ResponseHelper(201, "Ok", "Pomyślnie usunięto kolejkę"));
                }
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono kolejki"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

    }
}
