
using System.Text.Json.Serialization;

namespace api.Models
{
    public class Ride
    {
        public int RideId { get; set; }
        public int? RideGroupId { get; set; }
        [JsonIgnore]
        public RideGroup? RideGroup { get; set; } = default!;
        public int GokartId { get; set; }
        public Gokart? Gokart { get; set; } = default!;
        public int Time { get; set; }
        public int RideNumber { get; set; }
        public bool IsDisqualified { get; set; }
        public int PenaltyPoints { get; set; }
    }
}
