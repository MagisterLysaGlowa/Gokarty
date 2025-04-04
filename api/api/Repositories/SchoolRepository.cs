using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories {
    public class SchoolRepository : ISchoolRepository {
        private readonly AppDbContext _context;

        public SchoolRepository(AppDbContext context) => _context = context;

        public async Task<School> CreateAsync(School school) {
            await _context.Schools.AddAsync(school);
            await _context.SaveChangesAsync();
            return school;
        }

        public async Task<School?> GetAsync(int schoolId) {
            return await _context.Schools.FindAsync(schoolId);
        }

        public async Task<List<School>> GetAllAsync() {
            return await _context.Schools.ToListAsync();
        }

        public async Task<int?> RemoveAsync(int schoolId) {
            if (await _context.Schools.FindAsync(schoolId) is School school) {
                _context.Schools.Remove(school);
                await _context.SaveChangesAsync();
                return schoolId;
            }
            return null;
        }

        public async Task<School> UpdateAsync(School data) {
            _context.Update(data);
            await _context.SaveChangesAsync();
            return data;
        }



    }
}
