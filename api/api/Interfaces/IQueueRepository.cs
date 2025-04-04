using api.Models;

namespace api.Interfaces
{
    public interface IQueueRepository
    {
        Task CreateAsync(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart);
        Task<List<Queue>> GetAllForTournamentAsync(int tournamentId);
        Task<int?> RemoveAsync(int queueId);
    }
}
