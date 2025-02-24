using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class TournamentRepository : ITournamentRepository
    {
        private readonly AppDbContext _context;

        public TournamentRepository(AppDbContext context)=> _context = context;
        

        public async Task<Tournament> CreateAsync(Tournament tournament)
        {
            await _context.Tournaments.AddAsync(tournament);
            await _context.SaveChangesAsync();
            return tournament;
        }

        public async Task<Tournament?> UpdateAsync(int tournamentId, Tournament tournament)
        {
            if(await _context.Tournaments.FindAsync(tournamentId) is Tournament _tournament) {
                _tournament.Name = tournament.Name;
                _tournament.StartDate = tournament.StartDate;
                _tournament.EndDate = tournament.EndDate;
                _tournament.TournamentStateId = tournament.TournamentStateId;
                _tournament.TournamentTypeId = tournament.TournamentTypeId;

                _context.Tournaments.Update(_tournament);
                await _context.SaveChangesAsync();
                return _tournament;
            }
            return null;
        }

        public async Task<int?> RemoveAsync(int tournamentId)
        {
            if(await _context.Tournaments.FindAsync(tournamentId) is Tournament t) {
                _context.Tournaments.Remove(t);
                await _context.SaveChangesAsync();
                return tournamentId;
            }
            return null;
        }

        public async Task<List<Tournament>> GetAllAsync()
        {
            return await _context.Tournaments.ToListAsync();
        }

        public async Task<Tournament?> GetAsync(int tournamentId)
        {
            return await _context.Tournaments.FindAsync(tournamentId);
        }
    }
}
