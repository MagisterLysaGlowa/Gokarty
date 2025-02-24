using api.Dtos;
using api.Interfaces;
using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class TournamentController : ControllerBase {
        private readonly ITournamentRepository tournamentRepository;

        public TournamentController(ITournamentRepository tournamentRepository) => this.tournamentRepository = tournamentRepository;


        [HttpGet]
        public async Task<IActionResult> GetAll() {
            try {
                return Ok(await tournamentRepository.GetAllAsync());
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("{tournamentId}")]
        public async Task<IActionResult> Get(int tournamentId) {
            try {
                if(await tournamentRepository.GetAsync(tournamentId) is Tournament tournament)
                    return Ok(tournament);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(TournamentDto dto) {
            try {
                var tournament = new Tournament {
                    Name = dto.Name,
                    StartDate = dto.StartDate.Date.ToUniversalTime(),
                    EndDate = dto.EndDate.Date.ToUniversalTime(),
                    TournamentStateId = dto.TournamentStateId,
                    TournamentTypeId = dto.TournamentTypeId,
                };
                return Created("", await tournamentRepository.CreateAsync(tournament));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpPut("{tournamentId}")]
        public async Task<IActionResult> Update(int tournamentId, TournamentDto dto) {
            try {
                var tournament = new Tournament {
                    Name = dto.Name,
                    StartDate = dto.StartDate.Date.ToUniversalTime(),
                    EndDate = dto.EndDate.Date.ToUniversalTime(),
                    TournamentStateId = dto.TournamentStateId,
                    TournamentTypeId = dto.TournamentTypeId
                };
                if(await tournamentRepository.UpdateAsync(tournamentId, tournament) is Tournament _tournament)
                    return Ok(_tournament);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpDelete("{tournamentId}")]
        public async Task<IActionResult> Remove(int tournamentId) {
            try {
                if(await tournamentRepository.RemoveAsync(tournamentId) is int id)
                    return Ok(id);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }
    }
}
