using api.Models;
using static api.Repositories.RideRepository;

namespace api.Interfaces
{
    public interface IRideRepository
    {
        Task<Ride> CreateAsync(Ride ride);
        Task<Ride?> UpdateAsync(int rideId,Ride ride);
        Task<int?> RemoveAsync(int rideId);
        Task<List<Ride>> GetAllAsync();
        Task<Ride?> GetAsync(int rideId);
        Task<List<Ride>> FullGetAllAsync();
        Task<Ride?> FullGetAsync(int rideId);
        Task<List<Ride>> FullGetBestForTournamentAsync(int tournamentId);
        Task<int?> FindRideNumberAsync(int tournamentId, int playerId);
        Task<Ride?> FullGetLastAddedForTournamentAsync(int tournamentId);
        Task<List<PlayerRidesDto>> GetGroupedRidesForTournament(int tournamentId);
    }
}
