using api.Models;

namespace api.Interfaces
{
    public interface IQueueRepository
    {
        Task<bool> CreateQueuesAsync(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart);
        Task<List<Queue>> FullGetAllQueuesForTournamentAsync(int tournamentId);
        Task<int?> RemoveAsync(int queueId);
    }
}
