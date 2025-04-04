using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GokartController : ControllerBase
    {
        private readonly IGokartRepository gokartRepository;

        public GokartController(IGokartRepository gokartRepository)
        {
            this.gokartRepository = gokartRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Gokart data)
        {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla gokarta"));
                await gokartRepository.CreateAsync(data);
                return StatusCode(201, new ResponseHelper(201, "Created", "Pomyślnie dodano gokart"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Gokart data)
        {
            try {
                if (!ModelState.IsValid)
                    return StatusCode(400, new ResponseHelper(400, "BadRequest", "Podano błędne dane dla gokarta"));
                if (await gokartRepository.GetAsync(data.GokartId) is null)
                    return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono gokarta"));
                await gokartRepository.UpdateAsync(data);
                return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie uaktualniono gokart"));
            } catch (TimeoutException) {
                return StatusCode(408, new ResponseHelper(408, "Timeout", "Przkroczono czas wykonania operacji"));
            } catch (Exception) {
                return StatusCode(500, new ResponseHelper(500, "ServerError", "Wystąpił nieoczekiwany błąd"));
            }
        }

        [HttpDelete("{gokartId}")]
        public async Task<IActionResult> Remove(int gokartId)
        {
            try {
                if (await gokartRepository.RemoveAsync(gokartId) is int)
                    return StatusCode(200, new ResponseHelper(200, "Ok", "Pomyślnie usunięto gokart"));
                return StatusCode(404, new ResponseHelper(404, "NotFound", "Nie znaleziono gokarta"));
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