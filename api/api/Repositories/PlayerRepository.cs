using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories {
    public class PlayerRepository : IPlayerRepository {
        private readonly AppDbContext _context;

        public PlayerRepository(AppDbContext context) => _context = context;

        public async Task<Player> CreateAsync(Player player)
        {
            await _context.AddAsync(player);
            await _context.SaveChangesAsync();
            return player;
        }

        public async Task<Player> UpdateAsync(Player player)
        {
            _context.Players.Update(player);
            await _context.SaveChangesAsync();
            return player;
        }

        public async Task<int?> RemoveAsync(int playerId)
        {
            if (await _context.Players.FindAsync(playerId) is Player player)
            {
                _context.Remove(player);
                await _context.SaveChangesAsync();
                return playerId;
            }
            return null;
        }

        public async Task<Player?> GetAsync(int playerId)
        {
            return await _context.Players
                .Include(p => p.School)
                .Include(p => p.Class)
                .FirstAsync(p => p.PlayerId == playerId);
        }

        public async Task<List<Player>> FilterPlayersAsync(PlayerFilterDto dto) {
            var players = await _context.Players.Include(z => z.School).ToListAsync();

            if (!string.IsNullOrEmpty(dto.Name)) {
                players = players.Where(p => p.Name!.ToLower().Contains(dto.Name.ToLower())).ToList();
            }
            if (!string.IsNullOrEmpty(dto.Surname)) {
                players = players.Where(p => p.Surname!.ToLower().Contains(dto.Surname.ToLower())).ToList();
            }
            if (dto.SchoolId != 0) {
                players = players.Where(p => p.SchoolId == dto.SchoolId).ToList();
            }

            var playersInThisTournament = await _context.PlayerTournaments
                .Where(t => t.TournamentsId == dto.TournamentId)
                .Select(t => t.PlayersId)
                .ToListAsync();
            players = players.Where(p => !playersInThisTournament.Contains(p.PlayerId)).ToList();

            return players;
        }

        public async Task<List<Player>> GetAllForTournamentAsync(int tournamentId) {
           return await _context.PlayerTournaments
                .Where(pt => pt.TournamentsId == tournamentId)
                .Select(pt => pt.Player)
                .Include(p=>p.Class)
                .Include(p=>p.School)
                .ToListAsync();
        }

        public async Task<int?> AddPlayerToTournamentAsync(int tournamentId, int playerId)
        {
            var playerTournament = new PlayerTournament()
            {
                PlayersId = playerId,
                TournamentsId = tournamentId
            };
            if (!_context.PlayerTournaments.Any(e => e.TournamentsId == tournamentId && e.PlayersId == playerId))
            {
                await _context.PlayerTournaments.AddAsync(playerTournament);
                await _context.SaveChangesAsync();
                return playerId;
            }
            return null;
        }

        public async Task<int?> RemovePlayerFromTournamentAsync(int tournamentId, int playerId) {
            var playerTournament = await _context.PlayerTournaments.FirstOrDefaultAsync(pt => pt.PlayersId == playerId && pt.TournamentsId == tournamentId);
            if (playerTournament is PlayerTournament pt) {
                _context.PlayerTournaments.Remove(playerTournament);
                await _context.SaveChangesAsync();
                return playerTournament.PlayersId;
            }
            return null;
        }
    }
}
