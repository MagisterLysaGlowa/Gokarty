using System.Text.Json.Serialization;

namespace api.Models
{
    public class TournamentState
    {
        public int TournamentStateId { get; set; }
        public string State { get; set; } = String.Empty;
        [JsonIgnore]
        public ICollection<Tournament> Tournaments { get; } = [];
    }
}
