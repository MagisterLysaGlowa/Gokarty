
namespace api.Models
{
    public class Queue
    {
        public int QueueId { get; set; }
        public int TournamentId { get; set; }
        public Tournament Tournament { get; set; } = default!;
        public int PlayerId { get; set; }
        public Player Player { get; set; } = default!;
        public int QueuePosition { get; set; }
        public int GokartId { get; set; }
        public Gokart Gokart { get; set; } = default!;
    }
}
