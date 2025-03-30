using api.Models;

namespace api.Dtos
{
    public class TournemntTableUpdateDto
    {
        public Queue? CurrentRide { get; set; }
        public List<Queue> Queue { get; set; }
        public Ride? LastRide { get; set; }
        public List<Ride> Rides { get; set; }
    }
}
