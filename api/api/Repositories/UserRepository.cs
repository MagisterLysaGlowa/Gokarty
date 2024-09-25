using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.UserId == id);
        }

        public User GetByLogin(string login)
        {
            return _context.Users.FirstOrDefault(u => u.Login == login);
        }

        public bool LoginFree(string login)
        {
            return _context.Users.Any(u => u.Login == login);
        }
    }
}
