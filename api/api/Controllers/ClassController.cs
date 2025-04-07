using api.Helpers;
using api.Interfaces;
using api.Models;
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
                var _class = await classRepository.GetAsync(id);
                if (_class == null)
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono klasy"));
                return Ok(_class);
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

                await classRepository.CreateClass(data);
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

                if (await classRepository.GetAsync(data.ClassId) is null)
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono klasy"));

                await classRepository.UpdateClass(data);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono klasę"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przekroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            try {
                if (await classRepository.GetAsync(id) is null)
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono klasy"));

                await classRepository.RemoveClass(id);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto klasę"));
            } catch (DbUpdateException) {
                return StatusCode(409, new ResponseHelper(409, "Conflict", "Obiekt ma powiązane encje, usuń je i spróbuj ponownie"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przekroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }
    }
}
