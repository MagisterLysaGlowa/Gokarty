using api.Dtos;
using api.Helpers;
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

        public TournamentController(ITournamentRepository tournamentRepository) => this.tournamentRepository = tournamentRepository;


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try {
                return Ok(await tournamentRepository.GetAllAsync());
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("{tournamentId}")]
        public async Task<IActionResult> Get(int tournamentId)
        {
            try {
                if (await tournamentRepository.GetAsync(tournamentId) is Tournament tournament)
                    return Ok(tournament);
                return NotFound();
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(Tournament data)
        {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla zawodów"));
                await tournamentRepository.CreateAsync(data);
                return StatusCode(201, new ResponseHelper(201, "OK", "Pomyślnie dodano zawody"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPut("{tournamentId}")]
        public async Task<IActionResult> Update(Tournament data)
        {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla zawodów"));
                if (await tournamentRepository.GetAsync(data.TournamentId) is null)
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono zawodów"));
                await tournamentRepository.UpdateAsync(data);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono zawody"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("{tournamentId}")]
        public async Task<IActionResult> Remove(int tournamentId)
        {
            try {
                if (await tournamentRepository.RemoveAsync(tournamentId) is int id)
                    return StatusCode(200, new ResponseHelper(200, "OK", "Pomyślnie usunięto zawody"));
                return StatusCode(404, new ResponseHelper(400, "Not found", "Nie znaleziono zawodów"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }
}