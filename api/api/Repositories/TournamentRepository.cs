using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class TournamentRepository : ITournamentRepository
    {
        private readonly AppDbContext _context;

        public TournamentRepository(AppDbContext context) => _context = context;


        public async Task<Tournament> CreateAsync(Tournament tournament)
        {
            await _context.Tournaments.AddAsync(tournament);
            await _context.SaveChangesAsync();
            return tournament;
        }

        public async Task<Tournament?> UpdateAsync(Tournament data)
        {
            data.TournamentState = null;
            data.TournamentType = null;
            _context.Tournaments.Update(data);
            await _context.SaveChangesAsync();
            return data;
        }

        public async Task<int?> RemoveAsync(int tournamentId)
        {
            if (await _context.Tournaments.FindAsync(tournamentId) is Tournament t) {
                _context.Tournaments.Remove(t);
                await _context.SaveChangesAsync();
                return tournamentId;
            }
            return null;
        }

        public async Task<List<Tournament>> GetAllAsync()
        {
            return await _context.Tournaments
                .Include(t => t.TournamentState)
                .Include(t => t.TournamentType)
                .ToListAsync();
        }

        public async Task<Tournament?> GetAsync(int tournamentId)
        {
            return await _context.Tournaments
                .Include(z => z.TournamentType)
                .Include(z => z.TournamentState)
                .FirstOrDefaultAsync(z => z.TournamentId == tournamentId);
        }

        public async Task<bool> ExistsAsync(int tournamentId) {
           return await _context.Tournaments.AnyAsync(t=>t.TournamentId==tournamentId);
        }
    }
}