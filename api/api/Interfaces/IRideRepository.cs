using api.Models;

namespace api.Interfaces
{
    public interface IRideRepository
    {
        Ride Create(Ride ride);
        Ride Update(int rideId,Ride ride);
        int Remove(int rideId);
        List<Ride> GetAll();
        Ride Get(int rideId);
        List<Ride> FullGetAll();
        Ride FullGet(int rideId);
    }
}
