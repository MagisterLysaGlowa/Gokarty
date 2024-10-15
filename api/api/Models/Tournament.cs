using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models {
    public class Tournament {
        public int TournamentId { get; set; }
        public string? Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TournamentStateId { get; set; }
        public TournamentState TournamentState { get; set; } = default!;
        public int? TournamentTypeId { get; set; }
        public TournamentType TournamentType { get; set; } = default!;
        [JsonIgnore]
        public List<PlayerTournament> PlayerTournaments { get; set; } = new();
        [JsonIgnore]
        public ICollection<Ride> Rides { get; } = default!;
        [JsonIgnore]
        public ICollection<Queue> Queues { get; } = default!;
    }
}
