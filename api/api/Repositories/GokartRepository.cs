using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class GokartRepository : IGokartRepository
    {
        private readonly AppDbContext _context;

        public GokartRepository(AppDbContext context)
        {
            _context = context;
        }
        public Gokart Create(Gokart gokart)
        {
            _context.Gokarts.Add(gokart);
            _context.SaveChanges();
            return gokart;
        }

        public Gokart Get(int gokartId)
        {
            var gokart = _context.Gokarts.Find(gokartId);
            if (gokart == null) return null!;
            return gokart;
        }

        public List<Gokart> GetAll()
        {
            return _context.Gokarts.ToList();
        }

        public int Remove(int gokartId)
        {
            var gokart = _context.Gokarts.Find(gokartId);
            if (gokart == null) return 0;
            _context.Gokarts.Remove(gokart);
            _context.SaveChanges();
            return gokartId;
        }

        public Gokart Update(int gokartId, Gokart gokart)
        {
            var gokart_db = _context.Gokarts.Find(gokartId);

            if (gokart_db == null) return null!;

            gokart_db.Name = gokart.Name;

            _context.Update(gokart_db);
            _context.SaveChanges();
            return gokart_db;
        }
    }
}
