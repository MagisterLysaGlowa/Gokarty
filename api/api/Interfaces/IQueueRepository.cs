using api.Models;

namespace api.Interfaces
{
    public interface IQueueRepository
    {
        Queue Create(Queue queue);
        Queue Update(int queueId,Queue queue);
        int Remove(int queueId);
        List<Queue> GetAll ();
        Queue Get (int queueId);
        List<Queue> FullGetAll();
        Queue FullGet(int queueId);
    }
}
