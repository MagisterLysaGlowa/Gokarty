using System.Text.Json.Serialization;

namespace api.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Surname { get; set; } = String.Empty;
        public DateTime BirthDate { get; set; }
        public int? ClassId { get; set; }
        public Class Class { get; set; } = default!;
        [JsonIgnore]
        public ICollection<PlayerTournament> PlayerTournaments { get; set; } = [];
        [JsonIgnore]
        public ICollection<RideGroup> RideGroups { get; } = [];
        [JsonIgnore]
        public ICollection<Queue> Queues { get; } = [];
    }
}
