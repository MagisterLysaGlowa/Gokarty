using api.Dtos;
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
        public IActionResult Create(GokartDto dto)
        {
            var gokart = new Gokart()
            {
                Name = dto.Name
            };
            return Ok(gokartRepository.Create(gokart));
        }

        [HttpPut("{gokartId}")]
        public IActionResult Update(int gokartId, GokartDto dto)
        {
            var gokart = new Gokart()
            {
                Name = dto.Name
            };
            return Ok(gokartRepository.Update(gokartId, gokart));
        }

        [HttpDelete("{gokartId}")]
        public IActionResult Remove(int gokartId)
        {
            return Ok(gokartRepository.Remove(gokartId));
        }

        [HttpGet("{gokartId}")]
        public IActionResult Get(int gokartId)
        {
            return Ok(gokartRepository.Get(gokartId));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(gokartRepository.GetAll());
        }
    }
}
