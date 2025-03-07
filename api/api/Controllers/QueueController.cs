using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class QueueController : ControllerBase {
        private readonly IQueueRepository queueRepository;

        public QueueController(IQueueRepository queueRepository) {
            this.queueRepository = queueRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateQueues(QueueDto dto) {
            try {
                if (await queueRepository.CreateQueuesAsync(dto.TournamentId, dto.GokartIds, dto.NumberOfRidesInOneGokart))
                    return Created("",true);
                return BadRequest("Bad request");
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("{queueId}")]
        public async Task<IActionResult> Get(int queueId) {
            try {
                if (await queueRepository.GetAsync(queueId) is Queue queue)
                    return Ok(queue);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            try {
                return Ok(await queueRepository.GetAllAsync());
            } catch (Exception) {
                return NotFound();
            }
        }

        [HttpPut("{queueId}")]
        public async Task<IActionResult> UpdateRideState(int queueId) {
            try {
                return Ok(await queueRepository.ChangeQueueStateAsync(queueId));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full")]
        public async Task<IActionResult> FullGetAll() {
            try {
                return Ok(await queueRepository.FullGetAllAsync());
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full/tournament/{tournamentId}/active")]
        public async Task<IActionResult> FullGetActiveQueueForTournament(int tournamentId) {
            try {
                //ToDo do sprawdzenia
                if(await queueRepository.FullGetActiveQueueForTournamentAsync(tournamentId) is Queue q)
                    return Ok(q);
                return NotFound();
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full/tournament/{tournamentId}")]
        public async Task<IActionResult> FullGetAllQuueuesForTournament(int tournamentId) {
            try {
                return Ok(await queueRepository.FullGetAllQueuesForTournamentAsync(tournamentId));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpGet("full/{queueId}")]
        public async Task<IActionResult> FullGetAll(int queueId) {
            try {
                return Ok(await queueRepository.FullGetAsync(queueId));
            } catch (Exception) {
                return BadRequest();
            }
        }

        [HttpDelete("{tournamentId}")]
        public async Task<IActionResult> Remove(int tournamentId) {
            try {
                return Ok(await queueRepository.RemoveQueuesForTournamentAsync(tournamentId));
            } catch (Exception) {
                return BadRequest();
            }
        }
        [HttpGet("tournament/{tournamentID}/players")]
        public async Task<IActionResult> GetPlayers(int tournamentID) {
            try {
                return Ok(await queueRepository.GetPlayersForQueueAsync(tournamentID));
            } catch (Exception) {
                return BadRequest();
            }
        }
        [HttpPost("tournament/{tournamentID}/player/{playerID}")]
        public async Task<IActionResult> AddPlayerToQueue(int tournamentID, int playerID) {
            try {
                return Created("",await queueRepository.AddPlayerToQueueAsync(tournamentID, playerID));
            } catch (Exception) {
                return BadRequest();
            }
        }

    }
}
