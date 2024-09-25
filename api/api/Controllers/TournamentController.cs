using api.Dtos;
using api.Interfaces;
using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase
    {
        private readonly ITournamentRepository tournamentRepository;

        public TournamentController(ITournamentRepository tournamentRepository)
        {
            this.tournamentRepository = tournamentRepository;
        }

        [HttpGet]
        public IActionResult GetAll ()
        {
            return Ok(tournamentRepository.GetAll());
        }

        [HttpGet("{tournamentId}")]
        public IActionResult Get(int tournamentId)
        {
            return Ok(tournamentRepository.Get(tournamentId));
        }

        [HttpPost]
        public IActionResult Create(TournamentDto dto)
        {
            var tournament = new Tournament
            {
                Name = dto.Name,
                StartDate = dto.StartDate.Date.ToUniversalTime(),
                EndDate = dto.EndDate.Date.ToUniversalTime(),
                TournamentStateId = dto.TournamentStateId,
            };
            return Ok(tournamentRepository.Create(tournament));
        }

        [HttpPut("{tournamentId}")]
        public IActionResult Update(int tournamentId,TournamentDto dto)
        {
            var tournament = new Tournament
            {
                Name = dto.Name,
                StartDate = dto.StartDate.Date.ToUniversalTime(),
                EndDate = dto.EndDate.Date.ToUniversalTime(),
                TournamentStateId = dto.TournamentStateId,
            };
            return Ok(tournamentRepository.Update(tournamentId, tournament));
        }

        [HttpDelete("{tournamentId}")]
        public IActionResult Remove(int tournamentId)
        {
            return Ok(tournamentRepository.Remove(tournamentId));
        }
    }
}
