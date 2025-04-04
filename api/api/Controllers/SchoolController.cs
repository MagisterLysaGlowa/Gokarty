using api.Dtos;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase {
        private readonly ISchoolRepository schoolRepository;

        public SchoolController(ISchoolRepository schoolRepository) => this.schoolRepository = schoolRepository;

        [HttpPost]
        public async Task<IActionResult> Create(School data)
        {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla szkoły"));
                await schoolRepository.CreateAsync(data);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie dodano szkołe"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPut("{schoolId}")]
        public async Task<IActionResult> Update(School data)
        {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błedne dane dla szkoły"));
                if (await schoolRepository.GetAsync(data.SchoolId) is null)
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono szkoły"));
                await schoolRepository.UpdateAsync(data);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono szkołe"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("{schoolId}")]
        public async Task<IActionResult> Remove(int schoolId) {
            try {
                if (await schoolRepository.RemoveAsync(schoolId) is int sId)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto szkołe"));
                return NotFound();
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            try {
                return Ok(await schoolRepository.GetAllAsync());
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }
}