using api.Models;

namespace api.Dtos
{
    public class PlayerRidesDto
    {
        public Player Player { get; set; } = default!;
        public Class Class { get; set; } = default!;
        public List<RideInfoDto> Times { get; set; } = new();
    }
    public class RideInfoDto
    {
        public int RideId { get; set; }
        public int Time { get; set; }
        public Gokart Gokart { get; set; } = default!;
        public int RideNumber { get; set; }
        public bool IsDSQ { get; set; }
    }
}
