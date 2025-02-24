using api.Models;

namespace api.Interfaces
{
    public interface IQueueRepository
    {
        Task<bool> CreateQueuesAsync(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart);
        Task<List<Queue>> GetAllAsync();
        Task<Queue?> GetAsync (int queueId);
        Task<List<Queue>> FullGetAllAsync();
        Task<Queue?> FullGetAsync(int queueId);
        Task<List<Queue>> FullGetAllQueuesForTournamentAsync(int tournamentId);
        Task<bool> ChangeQueueStateAsync(int queueId);
        Task<bool> RemoveQueuesForTournamentAsync(int tournamentId);
        Task<Queue?> FullGetActiveQueueForTournamentAsync(int tournamentId);
        Task<List<Player>> GetPlayersForQueueAsync(int tournamentId);
        Task<bool> AddPlayerToQueueAsync(int tournamentId, int playerId);
    }
}
