using System.Text.Json.Serialization;

namespace api.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public int SchoolId { get; set; }
        public School School { get; set; } = new();
        public int? ClassId { get; set; }
        public Class Class { get; set; } = new();
        [JsonIgnore]
        public ICollection<PlayerTournament> PlayerTournaments { get; set; } = [];
        [JsonIgnore]
        public ICollection<RideGroup> RideGroups { get; } = [];
        [JsonIgnore]
        public ICollection<Queue> Queues { get; } = [];
    }
}
