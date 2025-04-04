using System.Text.Json.Serialization;

namespace api.Models
{
    public class Class
    {
        public int ClassId { get; set; }
        public string Name { get; set; } = String.Empty;
        public int SchoolId { get; set; }
        public School School { get; set; } = default!;
        [JsonIgnore]
        public ICollection<Player> Players { get; } = [];
        [JsonIgnore]
        public ICollection<RideGroup> RideGroups { get; } = [];
    }
}
