using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface IRideRepository
    {
        Task<Ride> CreateAsync(Ride ride);
        Task<Ride> UpdateAsync(Ride ride);
        Task<int?> RemoveAsync(int rideId);
        Task<List<RideWithGroupDto>> GetBestForTournamentAsync(int tournamentId);
        Task<RideWithGroupDto?> GetLastAddedForTournamentAsync(int tournamentId);
        Task<List<RideGroup>> GetRideGroupsForTournamentAsync(int tournamentId);
        Task<Ride?> GetAsync(int rideId);
        Task<int> FindRideNumberAsync(int tournamentId, int playerId);
        Task<RideGroup> GetRideGroupAsync(int tournamentId, int playerId, int classId);
        Task<bool> ExistsAsync(int rideId);
    }
}