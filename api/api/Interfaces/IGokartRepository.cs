using api.Models;

namespace api.Interfaces
{
    public interface IGokartRepository
    {
        Gokart Create(Gokart gokart);
        Gokart Update(int gokartId, Gokart gokart);
        int Remove(int gokartId);
        List<Gokart> GetAll();
        Gokart Get(int gokartId);

    }
}
