using System.Text.Json.Serialization;

namespace api.Models {
    public class Tournament {
        public int TournamentId { get; set; }
        public string? Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TournamentStateId { get; set; }
        public TournamentState TournamentState { get; set; } = new();
        public int? TournamentTypeId { get; set; }
        public TournamentType TournamentType { get; set; } = new();
        [JsonIgnore]
        public ICollection<PlayerTournament> PlayerTournaments { get; set; } = [];
        [JsonIgnore]
        public ICollection<RideGroup> RideGroups { get; } = [];
        [JsonIgnore]
        public ICollection<Queue> Queues { get; } = [];
    }
}
