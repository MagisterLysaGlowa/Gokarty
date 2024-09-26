using api.Models;

namespace api.Interfaces
{
    public interface ISchoolRepository
    {
        School Create(School school);
        School Update(int schoolId,School school);
        int Remove(int schoolId); 
        List<School> GetAll();
        School Get(int schoolId);

    }
}
