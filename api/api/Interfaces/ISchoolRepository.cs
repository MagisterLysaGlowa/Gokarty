using api.Models;

namespace api.Interfaces
{
    public interface ISchoolRepository
    {
        Task<School> CreateAsync(School school);
        Task<School> UpdateAsync(School school);
        Task<int?> RemoveAsync(int schoolId);
        Task<List<School>> GetAllAsync();
        Task<School?> GetAsync(int schoolId);
        Task<bool> ExistsAsync(int schoolId);

    }
}