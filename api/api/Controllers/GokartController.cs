using api.Dtos;
using api.Exceptions;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Operator")]
    public class GokartController : ControllerBase
    {
        private readonly IGokartRepository gokartRepository;

        public GokartController(IGokartRepository gokartRepository)
        {
            this.gokartRepository = gokartRepository;
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] GokartDto data)
        {
            try {
                if (!ModelState.IsValid || JsonSerializer.Deserialize<Gokart>(data.Gokart, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true }) is not Gokart gokart)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla gokarta"));
                string filename = await ImageHelper.SaveImage(data.Image);
                if (string.IsNullOrEmpty(filename))
                    filename = "defaultGokartImage.jpg";
                gokart.Image = filename;
                await gokartRepository.CreateAsync(gokart);
                return StatusCode(201, new ResponseHelper(201, "Created", "Pomyślnie dodano gokart"));
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
        public async Task<IActionResult> Update([FromForm] GokartDto data)
        {
            try {
                if (!ModelState.IsValid || JsonSerializer.Deserialize<Gokart>(data.Gokart, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true }) is not Gokart gokart)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla gokarta"));
                if (!await gokartRepository.ExistsAsync(gokart.GokartId))
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono gokarta"));
                string filename = await ImageHelper.UpdateImage(data.Image, gokart.Image);
                if (string.IsNullOrEmpty(filename))
                    filename = "defaultGokartImage.jpg";
                gokart.Image = filename;
                await gokartRepository.UpdateAsync(gokart);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono gokart"));
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
        [Authorize]
        [HttpDelete("{gokartId}")]
        public async Task<IActionResult> Remove(int gokartId)
        {
            try {
                if (await gokartRepository.RemoveAsync(gokartId) is int)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto gokart"));
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono gokarta"));
            } catch (DbUpdateException) {
                return StatusCode(409, new ResponseHelper(409, "Conflict", "Obiekt ma powiązane encje, usuń je i spróbuj ponownie"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("massRemove")]
        public async Task<IActionResult> MassRemove(int[] gokartIds)
        {
            try {
                foreach(int gokartId in gokartIds) {
                    if (await gokartRepository.RemoveAsync(gokartId) is null)
                        return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono jednego z gokartów"));
                }
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto gokarty"));
            } catch (DbUpdateException) {
                return StatusCode(409, new ResponseHelper(409, "Conflict", "Jeden z obiektów ma powiązane encje, usuń je i spróbuj ponownie"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try {
                return Ok(await gokartRepository.GetAllAsync());
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }
}