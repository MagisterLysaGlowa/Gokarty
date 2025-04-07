using api.Models;

namespace api.Interfaces {
    public interface IClassRepository {
        Task<List<Class>> GetAllAsync();
        Task<Class?> GetAsync(int id);
        Task<Class> CreateClass(Class _class);
        Task<Class> UpdateClass(Class _class);
        Task<Class> DeleteClass(int id);
    }
}
