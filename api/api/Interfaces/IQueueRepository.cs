using api.Models;

namespace api.Interfaces
{
    public interface IQueueRepository
    {
        bool CreateQueues(int tournamentId, List<int> gokartIds, int numberOfRidesInOneGokart);
        int Remove(int queueId);
        List<Queue> GetAll ();
        Queue Get (int queueId);
        List<Queue> FullGetAll();
        Queue FullGet(int queueId);
        List<Queue> FullGetAllQueuesForTournament(int tournamentId);
    }
}
