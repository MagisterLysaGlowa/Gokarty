using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        User Create(User user);
        User GetByLogin(string login);
        User GetById(int id);
        bool LoginFree(string login);
    }
}
