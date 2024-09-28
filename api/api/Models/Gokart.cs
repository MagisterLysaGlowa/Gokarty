using System.Text.Json.Serialization;

namespace api.Models
{
    public class Gokart
    {
        public int GokartId { get; set; }
        public string? Name { get; set; }
        [JsonIgnore]
        public ICollection<Ride> Rides { get; } = default!;
        [JsonIgnore]
        public ICollection<Queue> Queues { get; } = default!;

    }
}
