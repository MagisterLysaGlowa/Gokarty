using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RideController : ControllerBase
    {
        private readonly IRideRepository rideRepository;

        public RideController(IRideRepository rideRepository)
        {
            this.rideRepository = rideRepository;
        }
        [HttpPost]
        public IActionResult Create(RideDto dto)
        {
            var ride = new Ride
            {
                TournamentId = dto.TournamentId,
                PlayerId = dto.PlayerId,
                GokartId = dto.GokartId,
                Time = dto.Time,
                RideNumber = dto.RideNumber,
            };
            return Ok(rideRepository.Create(ride));
        }

        [HttpPut("{rideId}")]
        public IActionResult Update(int rideId, RideDto dto)
        {
            var ride = new Ride
            {
                TournamentId = dto.TournamentId,
                PlayerId = dto.PlayerId,
                GokartId = dto.GokartId,
                Time = dto.Time,
                RideNumber = dto.RideNumber,
            };
            return Ok(rideRepository.Update(rideId,ride));
        }

        [HttpGet("{rideId}")]
        public IActionResult Get(int rideId)
        {
            return Ok(rideRepository.Get(rideId));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(rideRepository.GetAll());
        }

        [HttpGet("full")]
        public IActionResult FullGetAll()
        {
            return Ok(rideRepository.FullGetAll());
        }

        [HttpGet("full/{rideId}")]
        public IActionResult FullGetAll(int rideId)
        {
            return Ok(rideRepository.FullGet(rideId));
        }

        [HttpDelete("{rideId}")]
        public IActionResult Remove(int rideId)
        {
            return Ok(rideRepository.Remove(rideId));
        }
    }
}
