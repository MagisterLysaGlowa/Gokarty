using api.Models;

namespace api.Interfaces
{
    public interface ITournamentRepository
    {
        Task<List<Tournament>> GetAllAsync();
        Task<Tournament?> GetAsync(int tournamentId);
        Task<Tournament> CreateAsync(Tournament tournament);
        Task<Tournament?> UpdateAsync(Tournament tournament);
        Task<int?> RemoveAsync(int tournamentId);
    }
}
