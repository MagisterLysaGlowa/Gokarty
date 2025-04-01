using api.Models;

namespace api.Dtos
{
    public class FullRideDto
    {
        public Tournament Tournament { get; set; } = default!;
        public Player Player { get; set; } = default!;
        public Class Class { get; set; } = default!;
        public Gokart Gokart { get; set; } = default!;
        public int RideNumber { get; set; }
        public int Time { get; set; }
        public bool IsDisqualified { get; set; }
    }
}
