using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class TournamentRepository : ITournamentRepository
    {
        private readonly AppDbContext _context;

        public TournamentRepository(AppDbContext context)
        {
            _context = context;
        }

        public Tournament Create(Tournament tournament)
        {
            _context.Tournaments.Add(tournament);
            _context.SaveChanges();
            return tournament;
        }

        public Tournament Update(int tournamentId, Tournament tournament)
        {
            var tournament_db = _context.Tournaments.Find(tournamentId);
            if (tournament_db == null) return null!;

            tournament_db.Name = tournament.Name;
            tournament_db.StartDate = tournament.StartDate;
            tournament_db.EndDate = tournament.EndDate;
            tournament_db.TournamentStateId = tournament.TournamentStateId;

            _context.Tournaments.Update(tournament_db);
            _context.SaveChanges();
            return tournament_db;
        }

        public int Remove(int tournamentId)
        {
            var tournament = _context.Tournaments.Find(tournamentId);
            if (tournament == null) return 0;
            _context.Tournaments.Remove(tournament);
            _context.SaveChanges();
            return tournamentId;
        }

        public List<Tournament> GetAll()
        {
            return _context.Tournaments.ToList();
        }

        public Tournament Get(int tournamentId)
        {
            return _context.Tournaments.Find(tournamentId)!;
        }
    }
}
