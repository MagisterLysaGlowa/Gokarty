using System.Text.Json.Serialization;

namespace api.Models
{
    public class Class
    {
        public int ClassId { get; set; }
        public string Name { get; set; } = "";
        [JsonIgnore]
        public ICollection<Player> Players { get; } = default!;
        [JsonIgnore]
        public ICollection<RideGroup> RideGroups { get; } = default!;
    }
}
