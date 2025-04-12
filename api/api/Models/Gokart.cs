using System.Text.Json.Serialization;

namespace api.Models {
    public class Gokart {
        public int GokartId { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public string Image { get; set; } = String.Empty;
        [JsonIgnore]
        public ICollection<Ride> Rides { get; } = [];
        [JsonIgnore]
        public ICollection<Queue> Queues { get; } = [];

    }
}
