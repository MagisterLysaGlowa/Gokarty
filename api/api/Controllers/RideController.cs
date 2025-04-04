using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class RideController : ControllerBase {
        private readonly IRideRepository rideRepository;

        public RideController(IRideRepository rideRepository) => this.rideRepository = rideRepository;

        [HttpPost]
        public async Task<IActionResult> Create(RideDto dto) {
            try {
                if (await rideRepository.FindRideNumberAsync(dto.TournamentId, dto.PlayerId) is int last) {
                    var rideGroup = await rideRepository.GetRideGroupIfExists(dto.TournamentId, dto.PlayerId);
                    if (rideGroup != null) {
                        var ride = new Ride {
                            RideGroupId = rideGroup.RideGroupId,
                            GokartId = dto.GokartId,
                            Time = dto.Time,
                            IsDisqualified = dto.IsDisqualified == 1,
                            RideNumber = last,
                            PenaltyPoints = dto.PenaltyPoints,
                        };
                        return Created("", await rideRepository.CreateAsync(ride));
                    } else {
                        var ride = new Ride
                        {
                            RideGroupId = await rideRepository.CreateRideGroupAsync(dto.TournamentId, dto.PlayerId),
                            GokartId = dto.GokartId,
                            Time = dto.Time,
                            IsDisqualified = dto.IsDisqualified == 1,
                            RideNumber = last,
                            PenaltyPoints = dto.PenaltyPoints,
                        };
                        return Created("", await rideRepository.CreateAsync(ride));
                    }
                }
                else {
                    return BadRequest();
                }
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpPut("{rideId}")]
        public async Task<IActionResult> Update(int rideId, RideDto dto) {
            try {
                if (await rideRepository.GetAsync(rideId) is Ride _ride) {
                    var ride = new Ride {
                        GokartId = dto.GokartId,
                        Time = dto.Time,
                        IsDisqualified = dto.IsDisqualified == 1,
                        RideNumber = _ride.RideNumber
                    };
                    return Ok(await rideRepository.UpdateAsync(rideId, ride));
                }
                return NotFound();
            } catch (Exception e) {
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }

        [HttpGet("{rideId}")]
        public async Task<IActionResult> Get(int rideId) {
            try {
                if (await rideRepository.GetAsync(rideId) is Ride ride)
                    return Ok(ride);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync() {
            try {
                return Ok(await rideRepository.GetAllAsync());
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full")]
        public async Task<IActionResult> FullGetAll() {
            try {
                return Ok(await rideRepository.FullGetAllAsync());
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full/{rideId}")]
        public async Task<IActionResult> FullGetAll(int rideId) {
            try {
                return Ok(await rideRepository.FullGetAsync(rideId));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full/tournament/{tournamentId}")]
        public async Task<IActionResult> FullGetBestForTournament(int tournamentId) {
            try {
                return Ok(await rideRepository.FullGetBestForTournamentAsync(tournamentId));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full/tournament/{tournamentId}/last")]
        public async Task<IActionResult> FullGetLastAddedForTournament(int tournamentId) {
            try {
                if (await rideRepository.FullGetLastAddedForTournamentAsync(tournamentId) is FullRideDto ride)
                    return Ok(ride);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpDelete("{rideId}")]
        public async Task<IActionResult> Remove(int rideId) {
            try {
                if (await rideRepository.RemoveAsync(rideId) is int id)
                    return Ok(id);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full/tournament/{tournamentId}/all")]
        public async Task<IActionResult> GetFullAllForTournament(int tournamentId) {
            try {
                return Ok(await rideRepository.GetGroupedRidesForTournament(tournamentId));
            } catch (Exception) {
                return BadRequest();
            }
        }
    }
    
}
