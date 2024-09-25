using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Tournament
    {
        public int TournamentId { get; set; }
        public string? Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TournamentStateId { get; set; }
        public TournamentState TournamentState { get; set; } = default!;
        public List<PlayerTournament> PlayerTournaments { get; set; } = new();
    }
}
