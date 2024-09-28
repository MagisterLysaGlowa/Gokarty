using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class TournamentState
    {
        public int TournamentStateId { get; set; }
        public string? State { get; set; }
        [JsonIgnore]
        public ICollection<Tournament> Tournaments { get; }
    }
}
