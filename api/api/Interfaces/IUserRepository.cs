using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<User> CreateAsync(User user);
        Task<User?> GetByLoginAsync(string login);
        Task<User?> GetByIdAsync(int id);
        Task<bool> LoginFreeAsync(string login);
    }
}
