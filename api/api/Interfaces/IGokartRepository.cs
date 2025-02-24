using api.Models;

namespace api.Interfaces
{
    public interface IGokartRepository
    {
        Task<Gokart> CreateAsync(Gokart gokart);
        Task<Gokart?> UpdateAsync(int gokartId, Gokart gokart);
        Task<int?> RemoveAsync(int gokartId);
        Task<List<Gokart>> GetAllAsync();
        Task<Gokart?> GetAsync(int gokartId);

    }
}
