using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class RideController : ControllerBase {
        private readonly IRideRepository rideRepository;

        public RideController(IRideRepository rideRepository) => this.rideRepository = rideRepository;

        [HttpPost]
        public async Task<IActionResult> Create(RideDto dto) {
            try {
                if (await rideRepository.FindRideNumberAsync(dto.TournamentId, dto.PlayerId) is int last) {
                    var rideGroup = await rideRepository.GetRideGroupIfExists(dto.TournamentId, dto.PlayerId);
                    if (rideGroup != null) {
                        var ride = new Ride {
                            RideGroupId = rideGroup.RideGroupId,
                            GokartId = dto.GokartId,
                            Time = dto.Time,
                            IsDisqualified = dto.IsDisqualified == 1,
                            RideNumber = last,
                            PenaltyPoints = dto.PenaltyPoints,
                        };
                        return Created("", await rideRepository.CreateAsync(ride));
                    } else {
                        var ride = new Ride {
                            RideGroupId = await rideRepository.CreateRideGroupAsync(dto.TournamentId, dto.PlayerId),
                            GokartId = dto.GokartId,
                            Time = dto.Time,
                            IsDisqualified = dto.IsDisqualified == 1,
                            RideNumber = last,
                            PenaltyPoints = dto.PenaltyPoints,
                        };
                        return Created("", await rideRepository.CreateAsync(ride));
                    }
                } else {
                    return BadRequest();
                }
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpPut("{rideId}")]
        public async Task<IActionResult> Update(Ride data) {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Nie poprawne dane dla przejazdu"));
                if (await rideRepository.GetAsync(data.RideId) is null)
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
                    return StatusCode(200,new ResponseHelper(200,"Ok","Pomyślnie usunięto przejazd"));
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono przejazdu"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("full/tournament/{tournamentId}")]
        public async Task<IActionResult> FullGetBestForTournament(int tournamentId) {
            try {
                return Ok(await rideRepository.FullGetBestForTournamentAsync(tournamentId));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("full/tournament/{tournamentId}/last")]
        public async Task<IActionResult> FullGetLastAddedForTournament(int tournamentId) {
            try {
                if (await rideRepository.FullGetLastAddedForTournamentAsync(tournamentId) is FullRideDto ride)
                    return Ok(ride);
                return NotFound();
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("full/tournament/{tournamentId}/all")]
        public async Task<IActionResult> GetFullAllForTournament(int tournamentId) {
            try {
                return Ok(await rideRepository.GetGroupedRidesForTournament(tournamentId));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }

}
