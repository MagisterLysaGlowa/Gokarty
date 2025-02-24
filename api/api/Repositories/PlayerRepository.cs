using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories {
    public class PlayerRepository : IPlayerRepository {
        private readonly AppDbContext _context;

        public PlayerRepository(AppDbContext context) =>
            _context = context;


        public async Task<int?> AddPlayerToTournamentAsync(int tournamentId, int playerId) {
            var playerTournament = new PlayerTournament() {
                PlayersId = playerId,
                TournamentsId = tournamentId
            };
            if (!_context.PlayerTournaments.Any(e => e.TournamentsId == tournamentId && e.PlayersId == playerId)) {
                await _context.PlayerTournaments.AddAsync(playerTournament);
                await _context.SaveChangesAsync();
                return playerId;
            }
            return null;
        }

        public async Task<Player> CreateAsync(Player player, int tournamentId) {
            if (await _context.Tournaments.FindAsync(tournamentId) is Tournament tournament) {
                await _context.AddAsync(player);
                tournament.PlayerTournaments.Add(new() { Player = player });
                await _context.SaveChangesAsync();
                return player;
            }
            throw new InvalidOperationException();
        }

        public async Task<List<Player>> FilterPlayersAsync(PlayerFilterDto dto) {
            var players = await _context.Players.Include(z => z.School).ToListAsync();

            if (dto.Name != "" && dto.Name != null) {
                players = players.Where(p => p.Name!.ToLower().Contains(dto.Name.ToLower())).ToList();
            }

            if (dto.Surname != "" && dto.Surname != null) {
                players = players.Where(p => p.Surname!.ToLower().Contains(dto.Surname.ToLower())).ToList();
            }

            if (dto.SchoolId != 0) {
                players = players.Where(p => p.SchoolId == dto.SchoolId).ToList();
            }

            var playersInThisTournament = await _context.PlayerTournaments
                .Where(t => t.TournamentsId == dto.TournamentId)
                .Select(t => t.PlayersId)
                .ToListAsync();
            //ToDo: napraw async
            players = players.Where(p => !playersInThisTournament.Contains(p.PlayerId)).ToList();

            return players;
        }

        public async Task<Player?> GetAsync(int playerId) {
            return await _context.Players.FindAsync(playerId);
        }

        public async Task<List<Player>> GetAllAsync() {
            return await _context.Players.ToListAsync();
        }

        public async Task<List<Player>> GetAllForTournamentAsync(int tournamentId) {
            var players = await _context.PlayerTournaments
                            .Where(pt => pt.TournamentsId == tournamentId)
                            .Select(pt => pt.Player)
                            .ToListAsync();
            return players;
        }
        //ToDo: sprawdz rzutowanie
        public async Task<List<Player>> GetAllForTournamentWithSchoolAsync(int tournamentId) {
           return await _context.PlayerTournaments
                .Where(pt => pt.TournamentsId == tournamentId)
                .Include(z=>z.Player.School)
                .Select(pt => pt.Player)
                .ToListAsync();
        }
        //ToDo: sprawdz rzutowanie
        public async Task<Player?> GetPlayerWithSchoolAsync(int playerId) {
            return await _context.Players.Include(p => p.School).FirstAsync(p => p.PlayerId == playerId);
        }

        public async Task<int?> RemoveAsync(int playerId) {
            if (await _context.Players.FindAsync(playerId) is Player player) {
                _context.Remove(player);
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


        public async Task<Player?> UpdateAsync(int playerId, Player player) {
            if (await _context.Players.FindAsync(playerId) is Player playerDb) {
                playerDb.Name = player.Name;
                playerDb.Surname = player.Surname;
                playerDb.BirthDate = player.BirthDate;
                playerDb.SchoolId = player.SchoolId;
                _context.Players.Update(playerDb);
                await _context.SaveChangesAsync();
                return playerDb;
            }
            return null;
        }
    }
}
