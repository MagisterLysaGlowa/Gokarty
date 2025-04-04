using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class GokartController : ControllerBase {
        private readonly IGokartRepository gokartRepository;

        public GokartController(IGokartRepository gokartRepository) {
            this.gokartRepository = gokartRepository;
        }
        [HttpPost]
        public async Task<IActionResult> Create(GokartDto dto) {
            try {
                var gokart = new Gokart() {
                    Name = dto.Name
                };
                return Created("",await gokartRepository.CreateAsync(gokart));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpPut("{gokartId}")]
        public async Task<IActionResult> Update(int gokartId, GokartDto dto) {
            try {
                var gokart = new Gokart() {
                    Name = dto.Name
                };
                return Ok(await gokartRepository.UpdateAsync(gokartId, gokart));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpDelete("{gokartId}")]
        public async Task<IActionResult> Remove(int gokartId) {
            try {
                if (await gokartRepository.RemoveAsync(gokartId) is int id)
                    return Ok(id);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            try {
                return Ok(await gokartRepository.GetAllAsync());
            } catch (Exception) {
                return BadRequest();
            }
        }
    }
}
