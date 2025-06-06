using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories {
    public class ClassRepository : IClassRepository {
        private readonly AppDbContext _context;
        public ClassRepository(AppDbContext context) =>_context = context;
            
        
        public async Task<Class> CreateAsync(Class _class) {
            await _context.Classes.AddAsync(_class);
            await _context.SaveChangesAsync();
            return _class;
        }

        public async Task<int?> RemoveAsync(int classId)
        {
            if (await _context.Classes.FindAsync(classId) is Class _class) {
                _context.Classes.Remove(_class);
                await _context.SaveChangesAsync();
                return classId;
            }
            return null;
        }

        public async Task<List<Class>> GetAllAsync() {
            return await _context.Classes.Include(c=>c.School).OrderBy(c => c.ClassId).ToListAsync();
        }

        public async Task<Class?> GetAsync(int id) {
           return await _context.Classes.FindAsync(id);
        }

        public async Task<Class> UpdateAsync(Class _class) {
            _context.Update(_class);
            await _context.SaveChangesAsync();
            return _class;
        }

        public async Task<bool> ExistsAsync(int classId)
        {
            return await _context.Classes.AnyAsync(c => c.ClassId == classId);
        }
    }
}
