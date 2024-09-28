using System.Text.Json.Serialization;

namespace api.Models
{
    public class RideStatus
    {
        public int RideStatusId { get; set; }
        public string? State { get; set; }
        [JsonIgnore]
        public ICollection<Queue> Queues { get; } = default!;
    }
}
