using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace api.Repositories {
    public class QueueRepository : IQueueRepository {
        private readonly AppDbContext _context;
        private readonly IPlayerRepository _playerRepository;

        public QueueRepository(AppDbContext context, IPlayerRepository playerRepository) {
            _context = context;
            _playerRepository = playerRepository;
        }
        //ToDo: To jest straszny potwór 💀💀💀
        // wymaga poprawy
        public async Task<bool> CreateQueuesAsync(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart) {
            if (gokartIds.Count == 0)
                return false;
            if (numberOfRidesInOneGokart == 0)
                return false;
            if (_context.Rides.Where(r => r.TournamentId == tournamentId).ToList().Count != 0 && _context.Rides.Where(r => r.TournamentId == tournamentId).Max(r => r.RideNumber) >= gokartIds.Count)
                return false;
            int? lastUsedGokartId = _context.Rides.Where(r => r.TournamentId == tournamentId).OrderByDescending(r => r.RideId).FirstOrDefault()?.GokartId;
            List<Player> players = await _playerRepository.GetAllForTournamentAsync(tournamentId);
            List<Player> selectedPlayers = new List<Player>();
            Random rnd = new Random();

            int gokart = gokartIds[0];
            for (int i = 0; i < players.Count; i++) {
                if (i % numberOfRidesInOneGokart == 0) {
                    selectedPlayers.AddRange(players.GetRange(i, players.Count - (i % numberOfRidesInOneGokart) * numberOfRidesInOneGokart >= numberOfRidesInOneGokart ? numberOfRidesInOneGokart : players.Count - (i % numberOfRidesInOneGokart) * numberOfRidesInOneGokart));
                    if (lastUsedGokartId != null) {
                        List<int> usedGokarts = _context.Rides.Where(r => r.TournamentId == tournamentId && r.PlayerId == players[i].PlayerId).Select(r => r.GokartId).ToList();
                        List<int> filteredGokarts = gokartIds.Where(id => !usedGokarts.Contains(id)).ToList();
                        gokart = filteredGokarts[(filteredGokarts.FindIndex(id => id == lastUsedGokartId) + 1) % filteredGokarts.Count];
                    }
                    lastUsedGokartId = gokart;
                }

                var player = selectedPlayers[rnd.Next(0, selectedPlayers.Count)];
                _context.Queues.Add(new Queue() {
                    TournamentId = tournamentId,
                    PlayerId = player.PlayerId,
                    QueuePosition = i,
                    RideStatusId = 1,
                    GokartId = gokart,
                });
                selectedPlayers.Remove(player);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Queue>> FullGetAllQueuesForTournamentAsync(int tournamentId) {
            return await _context.Queues
                .Include(q => q.Tournament)
                .Include(q => q.Player)
                    .ThenInclude(p => p.School)
                .Include(q => q.RideStatus)
                .Include(q => q.Gokart)
                .Where(q => q.TournamentId == tournamentId && q.RideStatusId == 1)
                .OrderBy(q => q.QueuePosition)
                .ToListAsync();
        }

        public async Task<Queue?> FullGetAsync(int queueId) {
            return await _context.Queues
                .Include(q => q.Tournament)
                .Include(q => q.Player)
                    .ThenInclude(p => p.School)
                .Include(q => q.RideStatus)
                .Include(q => q.Gokart)
                .Where(q => q.QueueId == queueId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Queue>> FullGetAllAsync() {
            return await _context.Queues
                .Include(q => q.Tournament)
                .Include(q => q.Player)
                    .ThenInclude(p => p.School)
                .Include(q => q.RideStatus)
                .Include(q => q.Gokart)
                .ToListAsync();
        }

        public async Task<Queue?> GetAsync(int queueId) {
            return await _context.Queues.FindAsync(queueId);
        }

        public async Task<List<Queue>> GetAllAsync() {
            return await _context.Queues.ToListAsync();
        }

        public async Task<bool> ChangeQueueStateAsync(int queueId) {
            if (await _context.Queues.FirstAsync(q => q.QueueId == queueId) is Queue queue) {
                queue.RideStatusId++;
                _context.Queues.Update(queue);
                _context.SaveChanges();
                return true;
            }
            return false;
        }

        public async Task<bool> RemoveQueuesForTournamentAsync(int tournamentId) {
            if (await _context.Tournaments.FirstAsync(t => t.TournamentId == tournamentId) is null)
                return false;
            List<Queue> queues = await _context.Queues.Where(q => q.TournamentId == tournamentId).ToListAsync();
            if (queues.Count == 0)
                return false;
            foreach (var queue in queues) {
                _context.Queues.Remove(queue);
            }
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Queue?> FullGetActiveQueueForTournamentAsync(int tournamentId) {
            return await _context.Queues
                .Include(q => q.Tournament)
                .Include(q => q.Player).
                    ThenInclude(p => p.School)
                .Include(q => q.RideStatus)
                .Include(q => q.Gokart)
                .FirstOrDefaultAsync(q => q.TournamentId == tournamentId && q.RideStatusId == 2);
        }

        public async Task<List<Player>> GetPlayersForQueueAsync(int tournamentId) {
            var players = await _playerRepository.GetAllForTournamentAsync(tournamentId);
            var queues = await _context.Queues.Include(y => y.Player).Where(z => z.RideStatusId < 3).Select(j => j.Player).ToListAsync();

            return players.Where(z => !queues.Contains(z)).ToList();
        }

        public async Task<bool> AddPlayerToQueueAsync(int tournamentId, int playerId) {
            if (await _context.Queues.Where(z => z.TournamentId == tournamentId).OrderByDescending(z => z.QueuePosition).FirstOrDefaultAsync() is Queue q) {

                _context.Queues.Add(new Queue {
                    TournamentId = tournamentId,
                    PlayerId = playerId,
                    QueuePosition = q.QueuePosition + 1,
                    GokartId = 1,
                    RideStatusId = 1,
                });

                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
