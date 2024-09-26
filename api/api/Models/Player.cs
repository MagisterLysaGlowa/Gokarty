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
        [JsonIgnore]
        public School School { get; set; } = default!;
        [JsonIgnore]
        public List<PlayerTournament> PlayerTournaments { get; set; } = new();
    }
}
