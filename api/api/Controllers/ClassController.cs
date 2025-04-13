using api.Helpers;
using api.Interfaces;
using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase {
        private readonly IClassRepository classRepository;

        public ClassController(IClassRepository classRepository) {
            this.classRepository = classRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            try {
                return Ok(await classRepository.GetAllAsync());
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przekroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            try {
                if (await classRepository.GetAsync(id) is Class _class)
                    return Ok(_class);
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono klasy"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przekroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(Class data) {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla klasy"));
                await classRepository.CreateAsync(data);
                return StatusCode(201, new ResponseHelper(201, "Created", "Pomyślnie dodano klasę"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przekroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Class data) {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla klasy"));
                if (!await classRepository.ExistsAsync(data.ClassId))
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono klasy"));
                await classRepository.UpdateAsync(data);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono klasę"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przekroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("{classId}")]
        public async Task<IActionResult> Delete(int classId) {
            try {
                if (await classRepository.RemoveAsync(classId) is int)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto klasę"));
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono klasy"));
            } catch (DbUpdateException) {
                return StatusCode(409, new ResponseHelper(409, "Conflict", "Obiekt ma powiązane encje, usuń je i spróbuj ponownie"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przekroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("massRemove")]
        public async Task<IActionResult> MassRemove(int[] classIds)
        {
            try {
                foreach (int classId in classIds) {
                    if (await classRepository.RemoveAsync(classId) is null)
                        return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono jednej z klas"));
                }
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto klasy"));
            } catch (DbUpdateException) {
                return StatusCode(409, new ResponseHelper(409, "Conflict", "Jeden z obiektów ma powiązane encje, usuń je i spróbuj ponownie"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }
}
