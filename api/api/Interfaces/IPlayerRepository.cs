using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface IPlayerRepository
    {
        Player Create(Player player, int tournamentId);
        Player Update(int playerId,Player player);
        PlayerSchool GetPlayerWithSchool(int playerId);
        int Remove(int playerId);
        List<Player> GetAll();
        List<Player> GetAllForTournament(int tournamentId);
        Player Get(int playerId);
        List<Player> FilterPlayers(PlayerFilterDto dto);
        List<PlayerSchool> GetAllForTournamentWithSchool(int tournamentId);
        int AddPlayerToTournament(int tournamentId, int playerId);
        int RemovePlayerFromTournament(int tournamentId,int playerId);
    }
}
