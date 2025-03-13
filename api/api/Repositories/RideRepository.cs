using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories {
    public class RideRepository : IRideRepository {
        private readonly AppDbContext _context;

        public RideRepository(AppDbContext context) {
            _context = context;
        }
        public async Task<Ride> CreateAsync(Ride ride) {
            await _context.Rides.AddAsync(ride);
            await _context.SaveChangesAsync();
            return ride;
        }

        public async Task<Ride?> FullGetAsync(int rideId) {
            return await _context.Rides
                .Include(r => r.Tournament)
                .Include(r => r.Player)
                .Include(r => r.Gokart)
                .Where(r => r.RideId == rideId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Ride>> FullGetAllAsync() {
            return await _context.Rides
                    .Include(r => r.Tournament)
                    .Include(r => r.Player)
                    .Include(r => r.Gokart)
                    .ToListAsync();
        }

        public async Task<List<Ride>> FullGetBestForTournamentAsync(int tournamentId) {
            var rides = await _context.Rides
                .Include(r => r.Tournament)
                .Include(r => r.Player)
                    .ThenInclude(p => p.School)
                .Include(r => r.Gokart)
                .Where(r => r.TournamentId == tournamentId && !r.IsDisqualified)
                .ToListAsync();

            return rides
                .GroupBy(r => r.PlayerId)
                .Select(g => g.OrderBy(r => r.Time).First())
                .OrderBy(r => r.Time)
                .ToList();
        }



        public async Task<Ride?> GetAsync(int rideId) {
            return await _context.Rides.FindAsync(rideId)!;
        }

        public async Task<List<Ride>> GetAllAsync() {
            return await _context.Rides.ToListAsync();
        }

        public async Task<int?> RemoveAsync(int rideId) {
            if (await _context.Rides.FindAsync(rideId) is Ride ride) {
                _context.Rides.Remove(ride);
                await _context.SaveChangesAsync();
                return rideId;
            }
            return null;
        }

        public async Task<Ride?> UpdateAsync(int rideId, Ride ride) {
            if (await _context.Rides.FindAsync(rideId) is Ride rideDb) {
                rideDb.TournamentId = ride.TournamentId;
                rideDb.PlayerId = ride.PlayerId;
                rideDb.GokartId = ride.GokartId;
                rideDb.Time = ride.Time;
                rideDb.RideNumber = ride.RideNumber;
                rideDb.IsDisqualified = ride.IsDisqualified;
                _context.Rides.Update(rideDb);
                await _context.SaveChangesAsync();
                return rideDb;
            }
            return null;
        }

        public async Task<int?> FindRideNumberAsync(int tournamentId, int playerId) {
            return await _context.Rides
                .Where(r => r.TournamentId == tournamentId)
                .Where(r => r.PlayerId == playerId)
                .CountAsync() + 1;
        }

        public async Task<Ride?> FullGetLastAddedForTournamentAsync(int tournamentId) {
            return await _context.Rides
                .Include(r => r.Tournament)
                .Include(r => r.Player)
                .ThenInclude(p => p.School)
                .Include(r => r.Gokart)
                .Where(r => r.TournamentId == tournamentId)
                .OrderByDescending(r => r.RideId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<PlayerRidesDto>> GetGroupedRidesForTournament(int tournamentId) {
            var rides = await _context.Rides
                .Include(r => r.Player)
                    .ThenInclude(r=>r.School)
                .Include(r => r.Gokart)
                .Where(r => r.TournamentId == tournamentId)
                .ToListAsync();

            var groupedRides = rides
                .GroupBy(r => r.Player)
                .Select(g => new PlayerRidesDto {
                    Player = g.Key,
                    Times = g.Select(r => new RideInfoDto {
                        RideId=r.RideId,
                        Time = r.Time,
                        Gokart = r.Gokart,
                        RideNumber = r.RideNumber
                    }).OrderBy(z=>z.RideNumber).ToList()
                })
                .ToList();

            return groupedRides;
        }
        public class PlayerRidesDto {
            public Player Player { get; set; } = default!;
            public List<RideInfoDto> Times { get; set; } = new();
        }
        public class RideInfoDto {
            public int RideId { get; set; }
            public int Time { get; set; }
            public Gokart Gokart { get; set; }=default!;
            public int RideNumber { get; set; }
        }
    }
}
