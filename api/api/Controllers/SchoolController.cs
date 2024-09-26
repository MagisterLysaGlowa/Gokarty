using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
        private readonly ISchoolRepository schoolRepository;

        public SchoolController(ISchoolRepository schoolRepository)
        {
            this.schoolRepository = schoolRepository;
        }
        [HttpPost]
        public IActionResult Create(SchoolDto dto)
        {
            var school = new School()
            {
                Name = dto.Name,
                City = dto.City,
                Acronym = dto.Acronym,
            };
            return Ok(schoolRepository.Create(school));
        }

        [HttpPut("{schoolId}")]
        public IActionResult Update(int schoolId, SchoolDto dto)
        {
            var school = new School()
            {
                Name = dto.Name,
                City = dto.City,
                Acronym = dto.Acronym,
            };
            return Ok(schoolRepository.Update(schoolId, school));
        }

        [HttpDelete("{schoolId}")]
        public IActionResult Remove(int schoolId)
        {
            return Ok(schoolRepository.Remove(schoolId));
        }

        [HttpGet("{schoolId}")]
        public IActionResult Get(int schoolId)
        {
            return Ok(schoolRepository.Get(schoolId));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(schoolRepository.GetAll());
        }
    }
}
