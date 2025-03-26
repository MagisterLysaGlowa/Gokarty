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

        public async Task<bool> CreateQueuesAsync(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart)
        {
            if (gokartIds.Count == 0)
                return false;
            if (numberOfRidesInOneGokart == 0)
                return false;
            IEnumerable<Ride> tournamentRides = _context.Rides.Where(r => r.TournamentId == tournamentId);
            if (tournamentRides.ToList().Count != 0 && tournamentRides.Max(r => r.RideNumber) >= gokartIds.Count)
                return false;
            List<Player> playersInTournament = await _playerRepository.GetAllForTournamentAsync(tournamentId);
            int? lastUsedGokartId = tournamentRides.OrderByDescending(r => r.RideId).FirstOrDefault()?.GokartId;//gokart który był ostatnio użyty lub null jeżeli to pierwsze losowanie
            int gokartNowIndex = lastUsedGokartId is null ? 0 : (gokartIds.IndexOf((int)lastUsedGokartId) + 1) % gokartIds.Count;//index gokatraw liście gokartIds dla którego losujemy ludzi
            List<Player> playersNotQueued = new(playersInTournament);//wszyscy uczestnicy których nie wybraliśmy do kolejki, czyli na początku wszyscy
            List<Queue> queuesToAdd = new();
            Random rnd = new();

            for (int i = 0; i < playersInTournament.Count / numberOfRidesInOneGokart; i++)
            {
                //osoby które nie jechały gokartem dla którego losujemy i mogą zostać wybrane
                List<Player> canBeQueued = playersNotQueued.Where(p => !tournamentRides.Where(r => r.GokartId == gokartIds[gokartNowIndex]).Select(r => r.PlayerId).Contains(p.PlayerId)).ToList();
                for (int j = 0; j < numberOfRidesInOneGokart; j++)
                {
                    if (canBeQueued.Count > 0)
                    {
                        var player = canBeQueued[rnd.Next(0, canBeQueued.Count)];
                        queuesToAdd.Add(new Queue()
                        {
                            TournamentId = tournamentId,
                            PlayerId = player.PlayerId,
                            QueuePosition = (i * numberOfRidesInOneGokart) + j,
                            RideStatusId = 1,
                            GokartId = gokartIds[gokartNowIndex],
                        });
                        canBeQueued.Remove(player);
                        playersNotQueued.Remove(player);
                    }
                    else
                    {
                        for (int k = 0; k < numberOfRidesInOneGokart - j; k++)
                        {
                            List<Player> playersWhoCanSwap = playersInTournament.Where(p => !tournamentRides.Where(r => r.GokartId == gokartIds[gokartNowIndex]).Select(r => r.PlayerId).Contains(p.PlayerId)).ToList();
                            List<Queue> queuesWherePlayerCanSwap = queuesToAdd.Where(q => q.TournamentId == tournamentId && playersWhoCanSwap.Select(p => p.PlayerId).Contains(q.PlayerId) && gokartIds.Where(g => !tournamentRides.Where(r => r.PlayerId == playersNotQueued[k].PlayerId).Select(r => r.GokartId).Contains(g)).Contains(q.GokartId)).ToList();
                            var queueToSwap = queuesWherePlayerCanSwap[rnd.Next(0, queuesWherePlayerCanSwap.Count)];
                            queuesToAdd.RemoveAt(queuesToAdd.IndexOf(queueToSwap));
                            queuesToAdd.Add(new Queue()
                            {
                                TournamentId = tournamentId,
                                PlayerId = queueToSwap.PlayerId,
                                QueuePosition = (i * numberOfRidesInOneGokart) + j + k,
                                RideStatusId = 1,
                                GokartId = gokartIds[gokartNowIndex],
                            });
                            queueToSwap.PlayerId = playersNotQueued[k].PlayerId;
                            queuesToAdd.Add(queueToSwap);
                        }
                        break;
                    }
                }
                gokartNowIndex = (gokartNowIndex + 1) % gokartIds.Count;
            }

            foreach (Queue queue in queuesToAdd)
                await _context.Queues.AddAsync(queue);

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
                if (queue.RideStatusId > 3)
                    queue.RideStatusId = 3;
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
