using api.Models;

namespace api.Dtos
{
    public class RideWithGroupDto
    {
        public Tournament Tournament { get; set; } = new();
        public Player Player { get; set; } = new();
        public Class Class { get; set; } = new();
        public Ride Ride { get; set; } = new();
    }
}
