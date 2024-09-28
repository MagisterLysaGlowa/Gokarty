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
        public Queue Create(Queue queue)
        {
            _context.Queues.Add(queue);
            _context.SaveChanges();
            return queue;
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

        public Queue Update(int queueId, Queue queue)
        {
            var queue_db = _context.Queues.Find(queueId);
            if (queue_db == null) return null!;

            queue_db.TournamentId = queue.TournamentId;
            queue_db.PlayerId = queue.PlayerId;
            queue_db.QueuePosition = queue.QueuePosition;
            queue_db.RideStatusId = queue.RideStatusId;

            _context.Queues.Update(queue_db);
            _context.SaveChanges();
            return queue_db;
        }
    }
}
