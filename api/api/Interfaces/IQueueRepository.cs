using api.Models;

namespace api.Interfaces
{
    public interface IQueueRepository
    {
        Task<bool> CreateAsync(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart);
        Task<List<Queue>> GetAllForTournamentAsync(int tournamentId);
        Task<int?> RemoveAsync(int queueId);
    }
}
