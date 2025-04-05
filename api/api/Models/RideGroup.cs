using System.Text.Json.Serialization;

namespace api.Models
{
    public class RideGroup
    {
        public int RideGroupId { get; set; }
        public int PlayerId { get; set; }
        public Player? Player { get; set; } = default!;
        public int TournamentId { get; set; }
        public Tournament? Tournament { get; set; } = default!;
        public int ClassId { get; set; }
        public Class? Class { get; set; } = default!;
        [JsonIgnore]
        public ICollection<Ride> Rides { get; } = [];
    }
}
