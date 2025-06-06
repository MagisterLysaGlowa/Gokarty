using api.Dtos;
using api.Exceptions;
using api.Helpers;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Operator")]
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
            } catch (MoreRidesThanGokartsException) {
                return StatusCode(400, new ResponseHelper(400, "BadRequest", "Nie można przeprowadzić więcej przejazdów niż jest wybranch gokartów do losowania"));
            } catch (NumberOfRidesNotMultipleOfPlayersException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Ilość graczy nie jest wielokrotnością ilości przejazdów na gokart"));
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
            } catch (DbUpdateException) {
                return StatusCode(409, new ResponseHelper(409, "Conflict", "Obiekt ma powiązane encje, usuń je i spróbuj ponownie"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

    }
}
