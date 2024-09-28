namespace api.Dtos
{
    public class QueueDto
    {
        public int TournamentId { get; set; }
        public int PlayerId { get; set; }
        public int QueuePosition { get; set; }
        public int RideStatusId { get; set; }
    }
}
