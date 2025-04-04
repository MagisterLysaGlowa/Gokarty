using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories {
    public class QueueRepository : IQueueRepository {
        private readonly AppDbContext _context;
        private readonly IPlayerRepository _playerRepository;

        public QueueRepository(AppDbContext context, IPlayerRepository playerRepository) {
            _context = context;
            _playerRepository = playerRepository;
        }

        public async Task<bool> CreateAsync(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart)
        {
            if (gokartIds.Count == 0)
                return false;
            if (numberOfRidesInOneGokart == 0)
                return false;
            IEnumerable<Ride> tournamentRides = _context.Rides.Where(r => r.RideGroup.TournamentId == tournamentId).Include(r => r.RideGroup);
            if (tournamentRides.ToList().Count != 0 && tournamentRides.Max(r => r.RideNumber) >= gokartIds.Count)
                return false;
            List<Player> playersInTournament = await _playerRepository.GetAllForTournamentAsync(tournamentId);
            if (playersInTournament.Count % numberOfRidesInOneGokart != 0)
                return false;
            int? lastUsedGokartId = tournamentRides.OrderByDescending(r => r.RideId).FirstOrDefault()?.GokartId;//gokart który był ostatnio użyty lub null jeżeli to pierwsze losowanie
            int gokartNowIndex = lastUsedGokartId is null ? 0 : (gokartIds.IndexOf((int)lastUsedGokartId) + 1) % gokartIds.Count;//index gokatra w liście gokartIds dla którego losujemy ludzi
            List<Player> playersNotQueued = new(playersInTournament);//wszyscy uczestnicy których nie wybraliśmy do kolejki, czyli na początku wszyscy
            List<Queue> queuesToAdd = new();
            Random rnd = new();

            for (int i = 0; i < playersInTournament.Count / numberOfRidesInOneGokart; i++)
            {
                //osoby które nie jechały gokartem dla którego losujemy i mogą zostać wybrane
                List<Player> canBeQueued = playersNotQueued.Where(p => !tournamentRides.Where(r => r.GokartId == gokartIds[gokartNowIndex]).Select(r => r.RideGroup.PlayerId).Contains(p.PlayerId)).ToList();
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
                            GokartId = gokartIds[gokartNowIndex],
                        });
                        canBeQueued.Remove(player);
                        playersNotQueued.Remove(player);
                    }
                    else
                    {
                        for (int k = 0; k < numberOfRidesInOneGokart - j; k++)
                        {
                            List<Player> playersWhoCanSwap = playersInTournament.Where(p => !tournamentRides.Where(r => r.GokartId == gokartIds[gokartNowIndex]).Select(r => r.RideGroup.PlayerId).Contains(p.PlayerId)).ToList();
                            List<Queue> queuesWherePlayerCanSwap = queuesToAdd.Where(q => q.TournamentId == tournamentId && playersWhoCanSwap.Select(p => p.PlayerId).Contains(q.PlayerId) && gokartIds.Where(g => !tournamentRides.Where(r => r.RideGroup.PlayerId == playersNotQueued[k].PlayerId).Select(r => r.GokartId).Contains(g)).Contains(q.GokartId)).ToList();
                            var queueToSwap = queuesWherePlayerCanSwap[rnd.Next(0, queuesWherePlayerCanSwap.Count)];
                            queuesToAdd.RemoveAt(queuesToAdd.IndexOf(queueToSwap));
                            queuesToAdd.Add(new Queue()
                            {
                                TournamentId = tournamentId,
                                PlayerId = queueToSwap.PlayerId,
                                QueuePosition = (i * numberOfRidesInOneGokart) + j + k,
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

        public async Task<List<Queue>> GetAllForTournamentAsync(int tournamentId) {
            return await _context.Queues
                .Where(q => q.TournamentId == tournamentId)
                .Include(q => q.Tournament)
                .Include(q => q.Player)
                    .ThenInclude(p => p.School)
                .Include(q => q.Player)
                    .ThenInclude(p => p.Class)
                .Include(q => q.Gokart)
                .OrderBy(q => q.QueuePosition)
                .ToListAsync();
        }

        public async Task<int?> RemoveAsync(int queueId) {
            if (await _context.Queues.Where(q => q.QueueId == queueId).FirstOrDefaultAsync() is Queue queue)
            {
                _context.Queues.Remove(queue);
                await _context.SaveChangesAsync();
                return queue.TournamentId;
            }
            return null;
        }
    }
}
