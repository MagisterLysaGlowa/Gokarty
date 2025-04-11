using api.Dtos;
using api.Exceptions;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

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
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono zawodów"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] TournamentDto data)
        {
            try {
                if (!ModelState.IsValid || JsonSerializer.Deserialize<Tournament>(data.Tournament, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true }) is not Tournament tournament)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla zawodów"));
                string filename = await ImageHelper.SaveImage(data.Image);
                if (string.IsNullOrEmpty(filename))
                    filename = "defaultTournamentImage.jpg";
                tournament.Image = filename;
                await tournamentRepository.CreateAsync(tournament);
                return StatusCode(201, new ResponseHelper(201, "Created", "Pomyślnie dodano zawody"));
            } catch (FileSizeTooBigException) {
                return StatusCode(400, new ResponseHelper(400, "BadRequest", "Przekroczono maksymalny rozmiar pliku (5MB)"));
            } catch (NotAllowedExtensionException) {
                return StatusCode(400, new ResponseHelper(400, "BadRequest", "Niedozwolony format zdjęcia. Wybierz jeden z tych: " + String.Join(' ', ImageHelper.AllowedExtensions)));
            } catch (UploadedFileIsNotAnImageException) {
                return StatusCode(400, new ResponseHelper(400, "BadRequest", "Przesłany plik nie jest obrazem"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromForm] TournamentDto data)
        {
            try {
                if (!ModelState.IsValid || JsonSerializer.Deserialize<Tournament>(data.Tournament, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true }) is not Tournament tournament)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla zawodów"));
                if (!await tournamentRepository.ExistsAsync(tournament.TournamentId))
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono zawodów"));
                string filename = await ImageHelper.UpdateImage(data.Image, tournament.Image);
                if (string.IsNullOrEmpty(filename))
                    filename = "defaultTournamentImage.jpg";
                tournament.Image = filename;
                await tournamentRepository.UpdateAsync(tournament);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono zawody"));
            } catch (CouldNotDeleteFileException) {
                return StatusCode(400, new ResponseHelper(500, "ServerError", "Wystąpił błąd przy aktualizacji zdjęcia"));
            } catch (FileSizeTooBigException) {
                return StatusCode(400, new ResponseHelper(400, "BadRequest", "Przekroczono maksymalny rozmiar pliku (5MB)"));
            } catch (NotAllowedExtensionException) {
                return StatusCode(400, new ResponseHelper(400, "BadRequest", "Niedozwolony format zdjęcia. Wybierz jeden z tych: " + String.Join(' ', ImageHelper.AllowedExtensions)));
            } catch (UploadedFileIsNotAnImageException) {
                return StatusCode(400, new ResponseHelper(400, "BadRequest", "Przesłany plik nie jest obrazem"));
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