using System.Text.Json.Serialization;

namespace api.Models
{
    public class RideGroup
    {
        public int RideGroupId { get; set; }
        public int PlayerId { get; set; }
        public Player Player { get; set; } = new();
        public int TournamentId { get; set; }
        public Tournament Tournament { get; set; } = new();
        public int ClassId { get; set; }
        public Class Class { get; set; } = new();
        [JsonIgnore]
        public ICollection<Ride> Rides { get; } = [];
    }
}
