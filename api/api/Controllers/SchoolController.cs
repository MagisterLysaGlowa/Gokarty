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

        public SchoolController(ISchoolRepository schoolRepository)=>this.schoolRepository = schoolRepository;
        
        [HttpPost]
        public async Task<IActionResult> Create(SchoolDto dto)
        {
            try {
                var school = new School() {
                    Name = dto.Name,
                    City = dto.City,
                    Acronym = dto.Acronym,
                };
                return Created("",await schoolRepository.CreateAsync(school));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpPut("{schoolId}")]
        public async Task<IActionResult> Update(int schoolId, SchoolDto dto)
        {
            try {
                var school = new School() {
                    Name = dto.Name,
                    City = dto.City,
                    Acronym = dto.Acronym,
                };
                if(await schoolRepository.UpdateAsync(schoolId, school) is School _school)
                    return Ok(_school);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpDelete("{schoolId}")]
        public async Task<IActionResult> Remove(int schoolId)
        {
            try {
                if(await schoolRepository.RemoveAsync(schoolId) is int sId)
                    return Ok(sId);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("{schoolId}")]
        public async Task<IActionResult> Get(int schoolId)
        {
            try {
                if(await schoolRepository.GetOneAsync(schoolId) is School _school)
                    return Ok(_school);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try {
                return Ok(await schoolRepository.GetAllAsync());
            } catch (Exception) {
                return BadRequest();
            }
        }
    }
}
