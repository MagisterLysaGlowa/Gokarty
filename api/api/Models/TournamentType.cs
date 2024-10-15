using System.Text.Json.Serialization;

namespace api.Models {
    public class TournamentType {
        public int TournamentTypeId { get; set; }
        public string? Name { get; set; }
        [JsonIgnore]
        public ICollection<Tournament> Tournaments;
    }
}
