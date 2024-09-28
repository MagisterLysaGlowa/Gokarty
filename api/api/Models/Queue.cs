using System.Text.Json.Serialization;

namespace api.Models
{
    public class Queue
    {
        public int QueueId { get; set; }
        public int TournamentId { get; set; }
        [JsonIgnore]
        public Tournament Tournament { get; set; } = default!;
        public int PlayerId { get; set; }
        [JsonIgnore]
        public Player Player { get; set; } = default!;
        public int QueuePosition { get; set; }
        public int RideStatusId { get; set; }
        [JsonIgnore]
        public RideStatus RideStatus { get; set; } = default!;
    }
}
