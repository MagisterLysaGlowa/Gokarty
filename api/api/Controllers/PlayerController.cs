using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase {
        private readonly IPlayerRepository playerRepository;

        public PlayerController(IPlayerRepository playerRepository) => this.playerRepository = playerRepository;


        [HttpPost("{tournamentId}")]
        public async Task<IActionResult> Create(int tournamentId, PlayerDto dto) {
            try {
                var player = new Player {
                    Name = dto.Name,
                    Surname = dto.Surname,
                    BirthDate = dto.BirthDate.ToUniversalTime(),
                    SchoolId = dto.SchoolId,
                };
                return Created("",await playerRepository.CreateAsync(player, tournamentId));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("playerWithSchool/{playerId}")]
        public async Task<IActionResult> GetPlayerWithSchool(int playerId) {
            try {
                if (await playerRepository.GetPlayerWithSchoolAsync(playerId) is Player player)
                    return Ok(player);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("forTournament/{tournamentId}")]
        public async Task<IActionResult> GetPlayerForTournament(int tournamentId) {
            try {
                return Ok(await playerRepository.GetAllForTournamentAsync(tournamentId));
            } catch (Exception e) {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }

        [HttpGet("forTournament/withSchool/{tournamentId}")]
        public async Task<IActionResult> GetPlayerForTournamentWithSchool(int tournamentId) {
            try {
                return Ok(await playerRepository.GetAllForTournamentWithSchoolAsync(tournamentId));
            } catch (Exception e) {
                return BadRequest();
            }
        }

        [HttpPut("{playerId}")]
        public async Task<IActionResult> Update(int playerId, PlayerDto dto) {
            try {
                var player = new Player {
                    Name = dto.Name,
                    Surname = dto.Surname,
                    BirthDate = dto.BirthDate.ToUniversalTime(),
                    SchoolId = dto.SchoolId,
                };
                if (await playerRepository.UpdateAsync(playerId, player) is Player p)
                    return Ok(p);
                return NotFound();
            } catch (Exception e) {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{playerId}")]
        public async Task<IActionResult> Remove(int playerId) {
            try {
                if (await playerRepository.RemoveAsync(playerId) is int)
                    return Ok(playerId);
                return NotFound(playerId);
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("{playerId}")]
        public async Task<IActionResult> Get(int playerId) {
            try {
                if (await playerRepository.GetAsync(playerId) is Player player)
                    return Ok(player);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            try {
                return Ok(await playerRepository.GetAllAsync());
            } catch (Exception) {
                return NotFound();
            }
        }
        [HttpGet("filter")]
        public async Task<IActionResult> FilterPlayers([FromQuery] PlayerFilterDto dto) {
            try {
                return Ok(await playerRepository.FilterPlayersAsync(dto));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpPost("addplayertotournament/{tournamentId}")]
        public async Task<IActionResult> AddPlayerToTournament(int tournamentId, [FromBody] int playerId) {
            try {
                if (await playerRepository.AddPlayerToTournamentAsync(tournamentId, playerId) is int id)
                    return Created("",id);
                return Conflict();
            } catch (Exception e) {
                Console.WriteLine(e.Message);
                return BadRequest(e.Message);
            }
        }
        [HttpPost("removeplayerfromtournament/{tournamentId}")]
        public async Task<IActionResult> RemovePlayerFromTournament(int tournamentId, [FromBody] int playerId) {
            try {
                if (await playerRepository.RemovePlayerFromTournamentAsync(tournamentId, playerId) is int)
                    return Created("",playerId);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }
    }
}
