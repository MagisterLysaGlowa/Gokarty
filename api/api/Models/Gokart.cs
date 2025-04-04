using System.Text.Json.Serialization;

namespace api.Models {
    public class Gokart {
        public int GokartId { get; set; }
        public string Name { get; set; } = String.Empty;
        [JsonIgnore]
        public ICollection<Ride> Rides { get; } = [];
        [JsonIgnore]
        public ICollection<Queue> Queues { get; } = [];

    }
}
