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
        Player Get(int playerId);
    }
}
