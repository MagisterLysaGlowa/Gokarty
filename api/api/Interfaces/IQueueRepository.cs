using api.Models;

namespace api.Interfaces
{
    public interface IQueueRepository
    {
        bool CreateQueues(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart);
        List<Queue> GetAll ();
        Queue Get (int queueId);
        List<Queue> FullGetAll();
        Queue FullGet(int queueId);
        List<Queue> FullGetAllQueuesForTournament(int tournamentId);
        bool ChangeQueueState(int queueId);
        bool RemoveQueuesForTournament(int tournamentId);
    }
}
