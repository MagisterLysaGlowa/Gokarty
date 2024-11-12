using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace api.Repositories
{
    public class QueueRepository : IQueueRepository
    {
        private readonly AppDbContext _context;
        private readonly IPlayerRepository _playerRepository;

        public QueueRepository(AppDbContext context, IPlayerRepository playerRepository)
        {
            _context = context;
            _playerRepository = playerRepository;
        }

        public bool CreateQueues(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart)
        {
            if (gokartIds.Count == 0)
                return false;
            if (numberOfRidesInOneGokart == 0)
                return false;
            if (_context.Rides.Where(r => r.TournamentId == tournamentId).ToList().Count != 0 && _context.Rides.Where(r => r.TournamentId == tournamentId).Max(r => r.RideNumber) >= gokartIds.Count)
                return false;
            int? lastUsedGokartId = _context.Rides.Where(r => r.TournamentId == tournamentId).OrderByDescending(r => r.RideId).FirstOrDefault()?.GokartId;
            List<Player> players = _playerRepository.GetAllForTournament(tournamentId);
            List<Player> selectedPlayers = new List<Player>();
            Random rnd = new Random();

            int gokart = gokartIds[0];
            for(int i = 0; i < players.Count; i++)
            {
                if(i % numberOfRidesInOneGokart == 0)
                {
                    selectedPlayers.AddRange(players.GetRange(i, players.Count - (i % numberOfRidesInOneGokart) * numberOfRidesInOneGokart >= numberOfRidesInOneGokart ? numberOfRidesInOneGokart : players.Count - (i % numberOfRidesInOneGokart) * numberOfRidesInOneGokart));
                    if(lastUsedGokartId != null)
                    {
                        List<int> usedGokarts = _context.Rides.Where(r => r.TournamentId == tournamentId && r.PlayerId == players[i].PlayerId).Select(r => r.GokartId).ToList();
                        List<int> filteredGokarts = gokartIds.Where(id => !usedGokarts.Contains(id)).ToList();
                        gokart = filteredGokarts[(filteredGokarts.FindIndex(id => id == lastUsedGokartId) + 1) % filteredGokarts.Count];
                    }
                    lastUsedGokartId = gokart;
                }

                var player = selectedPlayers[rnd.Next(0, selectedPlayers.Count)];
                _context.Queues.Add(new Queue()
                {
                    TournamentId = tournamentId,
                    PlayerId = player.PlayerId,
                    QueuePosition = i,
                    RideStatusId = 1,
                    GokartId = gokart,
                });
                selectedPlayers.Remove(player);
            }

            _context.SaveChanges();
            return true;
        }

        public List<Queue> FullGetAllQueuesForTournament(int tournamentId)
        {
            return _context.Queues.Include(q => q.Tournament).Include(q => q.Player).ThenInclude(p => p.School).Include(q => q.RideStatus).Include(q => q.Gokart).Where(q => q.TournamentId == tournamentId && q.RideStatusId == 1).OrderBy(q => q.QueuePosition).ToList();
        }

        public Queue FullGet(int queueId)
        {
            return _context.Queues.Include(q => q.Tournament).Include(q => q.Player).ThenInclude(p => p.School).Include(q => q.RideStatus).Include(q => q.Gokart).Where(q => q.QueueId == queueId).FirstOrDefault()!;
        }

        public List<Queue> FullGetAll()
        {
            return _context.Queues.Include(q => q.Tournament).Include(q => q.Player).ThenInclude(p => p.School).Include(q => q.RideStatus).Include(q => q.Gokart).ToList();
        }

        public Queue Get(int queueId)
        {
            return _context.Queues.Find(queueId)!;
        }

        public List<Queue> GetAll()
        {
            return _context.Queues.ToList();
        }

        public bool ChangeQueueState(int queueId)
        {
            var queue = _context.Queues.Where(q => q.QueueId == queueId).First();
            if (queue == null)
                return false;
            queue.RideStatusId++;
            _context.Queues.Update(queue);
            _context.SaveChanges();
            return true;
        }

        public bool RemoveQueuesForTournament(int tournamentId)
        {
            if(_context.Tournaments.Where(t => t.TournamentId == tournamentId).First() == null)
                return false;
            List<Queue> queues = _context.Queues.Where(q => q.TournamentId == tournamentId).ToList();
            if(queues.Count == 0)
                return false;
            foreach (var queue in queues)
            {
                _context.Queues.Remove(queue);
            }
            _context.SaveChanges();
            return true;
        }

        public Queue FullGetActiveQueueForTournament(int tournamentId)
        {
            return _context.Queues.Include(q => q.Tournament).Include(q => q.Player).ThenInclude(p => p.School).Include(q => q.RideStatus).Include(q => q.Gokart).Where(q => q.TournamentId == tournamentId && q.RideStatusId == 2).FirstOrDefault()!;
        }

        public List<Player> GetPlayersForQueue(int tournamentId) {
            var players=_playerRepository.GetAllForTournament(tournamentId).ToList();
            var queues = _context.Queues.Include(y=>y.Player).Where(z => z.RideStatusId <3).Select(j=>j.Player).ToList(); 

            return players.Where(z=>!queues.Contains(z)).ToList();
        }

        public bool AddPlayerToQueue(int tournamentId, int playerId) {
            int? position = _context.Queues.Where(z => z.TournamentId == tournamentId)?.OrderByDescending(z => z.QueuePosition)?.FirstOrDefault()?.QueuePosition+1;

            _context.Queues.Add(new Queue {
                TournamentId = tournamentId,
                PlayerId = playerId,
                QueuePosition = position??0,
                GokartId = 1,
                RideStatusId=1,
            });

            _context.SaveChanges();
            return true;
        }
    }
}
