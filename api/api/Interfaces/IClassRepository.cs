using api.Models;

namespace api.Interfaces {
    public interface IClassRepository {
        Task<List<Class>> GetAllAsync();
        Task<Class?> GetAsync(int id);
        Task<Class> CreateAsync(Class _class);
        Task<Class> UpdateAsync(Class _class);
        Task<int?> RemoveAsync(int id);
        Task<bool> ExistsAsync(int gokartId);
    }
}
