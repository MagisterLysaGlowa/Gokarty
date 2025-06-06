using System.Text.Json.Serialization;

namespace api.Models {
    public class TournamentType {
        public int TournamentTypeId { get; set; }
        public string Name { get; set; } = String.Empty;
        [JsonIgnore]
        public ICollection<Tournament> Tournaments { get; } = [];
    }
}
