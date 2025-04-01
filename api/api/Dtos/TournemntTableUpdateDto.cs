using api.Models;

namespace api.Dtos
{
    public class TournemntTableUpdateDto
    {
        public Queue? CurrentRide { get; set; }
        public List<Queue> Queue { get; set; } = default!;
        public FullRideDto? LastRide { get; set; }
        public List<FullRideDto> Rides { get; set; } = default!;
    }
}
