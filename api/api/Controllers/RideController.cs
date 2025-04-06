using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RideController : ControllerBase
    {
        private readonly IRideRepository rideRepository;
        private readonly IQueueRepository queueRepository;
        private readonly ITournamentTableHubSender hubSender;

        public RideController(IRideRepository rideRepository, IQueueRepository queueRepository, ITournamentTableHubSender hubSender) {
            this.rideRepository = rideRepository;
            this.queueRepository = queueRepository;
            this.hubSender = hubSender;
        }

        [HttpPost]
        public async Task<IActionResult> Create(RideDto dto)
        {
            try {
                int rideNumber = await rideRepository.FindRideNumberAsync(dto.TournamentId, dto.PlayerId);
                var rideGroup = await rideRepository.GetRideGroupAsync(dto.TournamentId, dto.PlayerId, dto.ClassId);
                var ride = new Ride() {
                    RideGroupId = rideGroup.RideGroupId,
                    GokartId = dto.GokartId,
                    Time = dto.Time,
                    IsDisqualified = dto.IsDisqualified == 1,
                    RideNumber = rideNumber,
                    PenaltyPoints = dto.PenaltyPoints,
                };
                await rideRepository.CreateAsync(ride);
                await queueRepository.RemoveAsync(dto.deleteQueueId);
                await hubSender.SendUpdate(dto.TournamentId);
                return StatusCode(201, new ResponseHelper(201, "Created", "Pomyślnie utworzono przejazd"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Ride data)
        {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Nie poprawne dane dla przejazdu"));
                if (!await rideRepository.ExistsAsync(data.RideId))
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono przejazdu"));
                await rideRepository.UpdateAsync(data);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono przejazd"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("{rideId}")]
        public async Task<IActionResult> Remove(int rideId) {
            try {
                if (await rideRepository.RemoveAsync(rideId) is int id)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto przejazd"));
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono przejazdu"));
            } catch (DbUpdateException) {
                return StatusCode(409, new ResponseHelper(409, "Conflict", "Obiekt ma powiązane encje, usuń je i spróbuj ponownie"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("tournament/{tournamentId}/best")]
        public async Task<IActionResult> GetBestForTournament(int tournamentId)
        {
            try {
                return Ok(await rideRepository.GetBestForTournamentAsync(tournamentId));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("tournament/{tournamentId}/last")]
        public async Task<IActionResult> GetLastAddedForTournament(int tournamentId)
        {
            try {
                if (await rideRepository.GetLastAddedForTournamentAsync(tournamentId) is RideWithGroupDto ride)
                    return Ok(ride);
                return NotFound();
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("tournament/{tournamentId}")]
        public async Task<IActionResult> GetAllForTournament(int tournamentId)
        {
            try {
                return Ok(await rideRepository.GetRideGroupsForTournamentAsync(tournamentId));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }
}
