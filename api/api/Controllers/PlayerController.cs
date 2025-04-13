using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase {
        private readonly IPlayerRepository playerRepository;

        public PlayerController(IPlayerRepository playerRepository) => this.playerRepository = playerRepository;


        [HttpPost]
        public async Task<IActionResult> Create(Player data) {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla gracza"));
                await playerRepository.CreateAsync(data);
                return StatusCode(201, new ResponseHelper(201, "Created", "Pomyślnie dodano gracza"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Player data) {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla gracza"));
                if (!await playerRepository.ExistsAsync(data.PlayerId))
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono gracza"));
                await playerRepository.UpdateAsync(data);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono gracza"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("{playerId}")]
        public async Task<IActionResult> Remove(int playerId) {
            try {
                if (await playerRepository.RemoveAsync(playerId) is int)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto gracza"));
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono gracza"));
            } catch (DbUpdateException) {
                return StatusCode(409, new ResponseHelper(409, "Conflict", "Obiekt ma powiązane encje, usuń je i spróbuj ponownie"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("tournament/{tournamentId}")]
        public async Task<IActionResult> GetForTournament(int tournamentId) {
            try {
                return Ok(await playerRepository.GetAllForTournamentAsync(tournamentId));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter([FromQuery] PlayerFilterDto dto) {
            try {
                return Ok(await playerRepository.FilterPlayersAsync(dto));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPost("addToTournament/{tournamentId}")]
        public async Task<IActionResult> AddToTournament(int tournamentId, [FromBody] int playerId) {
            try {
                if (await playerRepository.AddToTournamentAsync(tournamentId, playerId) is int)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie dodano gracza do zawodów"));
                return StatusCode(409, new ResponseHelper(400, "BadRequest", "Gracz jest już dodany do zawodów lub nie istnieje"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPost("massAddToTournament/{tournamentId}")]
        public async Task<IActionResult> MassAddToTournament(int tournamentId, [FromBody] int[] playerIds)
        {
            try {
                foreach(int playerId in playerIds)
                    if (await playerRepository.AddToTournamentAsync(tournamentId, playerId) is null)
                        return StatusCode(409, new ResponseHelper(400, "BadRequest", "Jeden z graczy jest już dodany do zawodów lub nie istnieje"));
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie dodano graczy do zawodów"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPost("removeFromTournament/{tournamentId}")]
        public async Task<IActionResult> RemoveFromTournament(int tournamentId, [FromBody] int playerId) {
            try {
                if (await playerRepository.RemoveFromTournamentAsync(tournamentId, playerId) is int)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto gracza z zawodów"));
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Gracz nie jest w zawodach"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPost("massRemoveFromTournament/{tournamentId}")]
        public async Task<IActionResult> MassRemoveFromTournament(int tournamentId, [FromBody] int[] playerIds)
        {
            try {
                foreach(int playerId in playerIds)
                    if (await playerRepository.RemoveFromTournamentAsync(tournamentId, playerId) is null)
                        return StatusCode(404, new ResponseHelper(404, "NotFound", "Któryś z graczy nie jest w zawodach"));
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto graczy z zawodów"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }
}
