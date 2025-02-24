using api.Models;

namespace api.Interfaces
{
    public interface ISchoolRepository
    {
        Task<School> CreateAsync(School school);
        Task<School?> UpdateAsync(int schoolId,School school);
        Task<int?> RemoveAsync(int schoolId); 
        Task<List<School>> GetAllAsync();
        Task<School?> GetOneAsync(int schoolId);

    }
}
