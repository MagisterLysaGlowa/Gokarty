using api.Models;

namespace api.Interfaces
{
    public interface ITournamentRepository
    {
        List<Tournament> GetAll();
        Tournament Get(int tournamentId);
        Tournament Create(Tournament tournament);
        Tournament Update(int tournamentId, Tournament tournament);
        int Remove(int tournamentId);
    }
}
