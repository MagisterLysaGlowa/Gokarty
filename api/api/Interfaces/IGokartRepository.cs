using api.Models;

namespace api.Interfaces {
    public interface IGokartRepository {
        Task<Gokart> CreateAsync(Gokart gokart);
        Task<Gokart> UpdateAsync(Gokart gokart);
        Task<int?> RemoveAsync(int gokartId);
        Task<List<Gokart>> GetAllAsync();
    }
}