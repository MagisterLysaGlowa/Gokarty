using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerRepository playerRepository;

        public PlayerController(IPlayerRepository playerRepository)
        {
            this.playerRepository = playerRepository;
        }

        [HttpPost("{tournamentId}")]
        public IActionResult Create(int tournamentId,PlayerDto dto)
        {
            var player = new Player
            {
                Name = dto.Name,
                Surname = dto.Surname,
                BirthDate = dto.BirthDate.ToUniversalTime(),
                SchoolId = dto.SchoolId,
            };
            return Ok(playerRepository.Create(player,tournamentId));
        }

        [HttpGet("playerWithSchool/{playerId}")]
        public IActionResult GetPlayerWithSchool(int playerId)
        {
            return Ok(playerRepository.GetPlayerWithSchool(playerId));
        }

        [HttpGet("forTournament/{tournamentId}")]
        public IActionResult GetPlayerForTournament(int tournamentId)
        {
            return Ok(playerRepository.GetAllForTournament(tournamentId));
        }

        [HttpGet("forTournament/withSchool/{tournamentId}")]
        public IActionResult GetPlayerForTournamentWithSchool(int tournamentId)
        {
            return Ok(playerRepository.GetAllForTournamentWithSchool(tournamentId));
        }

        [HttpPut("{playerId}")]
        public IActionResult Update(int playerId, PlayerDto dto)
        {
            var player = new Player
            {
                Name = dto.Name,
                Surname = dto.Surname,
                BirthDate = dto.BirthDate.ToUniversalTime(),
                SchoolId = dto.SchoolId,
            };
            return Ok(playerRepository.Update(playerId,player));
        }

        [HttpDelete("{playerId}")]
        public IActionResult Remove(int playerId)
        {
            return Ok(playerRepository.Remove(playerId));
        }

        [HttpGet("{playerId}")]
        public IActionResult Get(int playerId)
        {
            return Ok(playerRepository.Get(playerId));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(playerRepository.GetAll());
        }
        [HttpGet("filter")]
        public IActionResult FilterPlayers([FromQuery] PlayerFilterDto dto)
        {
            return Ok(playerRepository.FilterPlayers(dto));
        }
    }
}
