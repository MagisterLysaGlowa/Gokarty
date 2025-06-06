using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories {
    public class GokartRepository : IGokartRepository {
        private readonly AppDbContext _context;

        public GokartRepository(AppDbContext context) => _context = context;

        public async Task<Gokart> CreateAsync(Gokart gokart) {
            await _context.Gokarts.AddAsync(gokart);
            await _context.SaveChangesAsync();
            return gokart;
        }

        public async Task<Gokart> UpdateAsync(Gokart gokart)
        {
            _context.Gokarts.Update(gokart);
            await _context.SaveChangesAsync();
            return gokart;
        }

        public async Task<int?> RemoveAsync(int gokartId) {
            if (await _context.Gokarts.FindAsync(gokartId) is Gokart gokart && await ImageHelper.DeleteImage(gokart.Image)) {
                _context.Gokarts.Remove(gokart);
                await _context.SaveChangesAsync();
                return gokartId;
            }
            return null;
        }

        public async Task<Gokart?> GetAsync(int gokartId)
        {
            return await _context.Gokarts.FindAsync(gokartId);
        }

        public async Task<List<Gokart>> GetAllAsync() {
            return await _context.Gokarts.OrderBy(g=>g.GokartId).ToListAsync();
        }
        public async Task<bool> ExistsAsync(int gokartId) {
            return await _context.Gokarts.AnyAsync(g => g.GokartId == gokartId);
        }
    }
}