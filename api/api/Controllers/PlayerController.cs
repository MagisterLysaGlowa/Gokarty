using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> Update(Player data)
        {
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
        public async Task<IActionResult> Remove(int playerId)
        {
            try {
                if (await playerRepository.RemoveAsync(playerId) is int)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto gracza"));
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono gracza"));
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
                if (await playerRepository.FilterPlayersAsync(dto) is List<Player> players && players.Count > 0)
                    return Ok(players);
                return NotFound();
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
                return StatusCode(409, new ResponseHelper(200, "Ok", "Gracz jest już dodany do zawodów"));
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
                return StatusCode(404, new ResponseHelper(404, "Ok", "Gracz nie jest w zawodach"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }
}
