using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class QueueRepository : IQueueRepository
    {
        private readonly AppDbContext _context;

        public QueueRepository(AppDbContext context)
        {
            _context = context;
        }

        public bool CreateQueues(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart)
        {
            if (gokartIds.Count == 0)
                return false;
            int gokartNow = gokartIds.First();
            List<Player> players = _context.Players.ToList();
            if (players.Count == 0)
                return false;
            Random rnd = new Random();
            int j = 0;
            while (players.Count > 0)
            {
                for (int i = 0; i < numberOfRidesInOneGokart && i < players.Count; i++)
                {
                    int player = players[rnd.Next(players.Count)].PlayerId;
                    _context.Queues.Add(new Queue()
                    {
                        TournamentId = tournamentId,
                        PlayerId = player,
                        QueuePosition = i,
                        RideStatusId = 1,
                    });
                    players.RemoveAt(player);
                }
                j++;
                j = j % gokartIds.Count;
                gokartNow = gokartIds[j];
            }
            _context.SaveChanges();
            return true;
        }

        public List<Queue> FullGetAllQueuesForTournament(int tournamentId)
        {
            return _context.Queues.Include(q => q.Tournament).Include(q => q.Player).Include(p => p.RideStatus).Where(q => q.TournamentId == tournamentId && q.RideStatusId == 1).ToList();
        }

        public Queue FullGet(int queueId)
        {
            return _context.Queues.Include(q => q.Tournament).Include(q => q.Player).Include(p => p.RideStatus).Where(q => q.QueueId == queueId).FirstOrDefault()!;
        }

        public List<Queue> FullGetAll()
        {
            return _context.Queues.Include(q => q.Tournament).Include(q => q.Player).Include(q => q.RideStatus).ToList();
        }

        public Queue Get(int queueId)
        {
            return _context.Queues.Find(queueId)!;
        }

        public List<Queue> GetAll()
        {
            return _context.Queues.ToList();
        }

        public int Remove(int queueId)
        {
            var queue = _context.Queues.Find(queueId);
            if (queue == null) return 0;
            _context.Queues.Remove(queue);
            _context.SaveChanges();
            return queueId;
        }
    }
}
