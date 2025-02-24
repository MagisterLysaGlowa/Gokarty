using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface IPlayerRepository
    {
        Task<Player> CreateAsync(Player player, int tournamentId);
        Task<Player?> UpdateAsync(int playerId,Player player);
        //ToDo: sprawdz rzutowanie
        Task<Player?> GetPlayerWithSchoolAsync(int playerId);
        Task<int?> RemoveAsync(int playerId);
        Task<List<Player>> GetAllAsync();
        Task<List<Player>> GetAllForTournamentAsync(int tournamentId);
        Task<Player?> GetAsync(int playerId);
        Task<List<Player>> FilterPlayersAsync(PlayerFilterDto dto);
        Task<List<Player>> GetAllForTournamentWithSchoolAsync(int tournamentId);
        Task<int?> AddPlayerToTournamentAsync(int tournamentId, int playerId);
        Task<int?> RemovePlayerFromTournamentAsync(int tournamentId,int playerId);
    }
}
