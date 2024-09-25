using Microsoft.Extensions.Hosting;

namespace api.Models
{
    public class TournamentState
    {
        public int TournamentStateId { get; set; }
        public string? State { get; set; }
        public ICollection<Tournament> Tournaments { get; }
    }
}
