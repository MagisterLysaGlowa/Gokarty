using System.Text.Json.Serialization;

namespace api.Models
{
    public class Ride
    {
        public int RideId { get; set; }
        public int TournamentId { get; set; }
        public Tournament Tournament { get; set; } = default!;
        public int PlayerId { get; set; }
        public Player Player { get; set; } = default!;
        public int GokartId { get; set; }
        public Gokart Gokart { get; set; } = default!;
        public int Time { get; set; }
        public int RideNumber { get; set; }
        public bool IsDisqualified { get; set; }
    }
}
