using api.Models;

namespace api.Dtos
{
    public class QueueDto
    {
        public int TournamentId { get; set; }
        public List<int> GokartIds { get; set; }
        public int NumberOfRidesInOneGokart { get; set; }
    }
}
