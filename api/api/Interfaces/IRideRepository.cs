using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface IRideRepository
    {
        Task<Ride> CreateAsync(Ride ride);
        Task<Ride?> UpdateAsync(Ride ride);
        Task<int?> RemoveAsync(int rideId);
        Task<List<FullRideDto>> FullGetBestForTournamentAsync(int tournamentId);
        Task<FullRideDto?> FullGetLastAddedForTournamentAsync(int tournamentId);
        Task<List<PlayerRidesDto>> GetGroupedRidesForTournament(int tournamentId);
        Task<Ride?> GetAsync(int rideId);
        Task<int?> FindRideNumberAsync(int tournamentId, int playerId);
        Task<int> CreateRideGroupAsync(int tournamentId, int playerId);
        Task<RideGroup?> GetRideGroupIfExists(int tournamentId, int playerId); 
    }
}
