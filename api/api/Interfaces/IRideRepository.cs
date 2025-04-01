using api.Dtos;
using api.Models;

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
        Task<List<FullRideDto>> FullGetBestForTournamentAsync(int tournamentId);
        Task<int?> FindRideNumberAsync(int tournamentId, int playerId);
        Task<FullRideDto?> FullGetLastAddedForTournamentAsync(int tournamentId);
        Task<List<PlayerRidesDto>> GetGroupedRidesForTournament(int tournamentId);
        Task<int> CreateRideGroupAsync(int tournamentId, int playerId);
        Task<RideGroup?> GetRideGroupIfExists(int tournamentId, int playerId); 
    }
}
