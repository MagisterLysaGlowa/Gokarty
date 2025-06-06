using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface IPlayerRepository
    {
        Task<Player> CreateAsync(Player player);
        Task<Player> UpdateAsync(Player player);
        Task<int?> RemoveAsync(int playerId);
        Task<Player?> GetAsync(int playerId);
        Task<List<Player>> FilterPlayersAsync(PlayerFilterDto dto);
        Task<List<Player>> GetAllForTournamentAsync(int tournamentId);
        Task<int?> AddToTournamentAsync(int tournamentId, int playerId);
        Task<int?> RemoveFromTournamentAsync(int tournamentId,int playerId);
        Task<bool> ExistsAsync(int playerId);
    }
}
