using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class RideRepository : IRideRepository
    {
        private readonly AppDbContext _context;

        public RideRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Ride> CreateAsync(Ride ride)
        {
            await _context.Rides.AddAsync(ride);
            await _context.SaveChangesAsync();
            return ride;
        }

        public async Task<Ride?> UpdateAsync(Ride data)
        {
            _context.Rides.Update(data);
            await _context.SaveChangesAsync();
            return data;
        }

        public async Task<int?> RemoveAsync(int rideId)
        {
            if (await _context.Rides.FindAsync(rideId) is Ride ride) {
                _context.Rides.Remove(ride);
                await _context.SaveChangesAsync();
                return rideId;
            }
            return null;
        }

        public async Task<List<FullRideDto>> FullGetBestForTournamentAsync(int tournamentId)
        {
            var rides = await _context.Rides
                .Where(r => r.RideGroup.TournamentId == tournamentId && !r.IsDisqualified)
                .Select(r => new FullRideDto()
                {
                    Tournament = r.RideGroup.Tournament,
                    Player = _context.Players.Where(p => p.PlayerId == r.RideGroup.PlayerId).Include(p => p.School).FirstOrDefault()!,
                    Class = r.RideGroup.Class,
                    Gokart = r.Gokart,
                    RideNumber = r.RideNumber,
                    IsDisqualified = r.IsDisqualified,
                    Time = r.Time
                }).ToListAsync();

            return rides
                .GroupBy(r => r.Player.PlayerId)
                .Select(g => g.OrderBy(r => r.Time).First())
                .OrderBy(r => r.Time)
                .ToList();
        }

        public async Task<FullRideDto?> FullGetLastAddedForTournamentAsync(int tournamentId)
        {
            return await _context.Rides
                .Where(r => r.RideGroup.TournamentId == tournamentId)
                .OrderByDescending(r => r.RideId)
                .Select(r => new FullRideDto()
                {
                    Tournament = r.RideGroup.Tournament,
                    Player = _context.Players.Where(p => p.PlayerId == r.RideGroup.PlayerId).Include(p => p.School).FirstOrDefault()!,
                    Class = r.RideGroup.Class,
                    Gokart = r.Gokart,
                    RideNumber = r.RideNumber,
                    IsDisqualified = r.IsDisqualified,
                    Time = r.Time
                }).FirstOrDefaultAsync();
        }

        public async Task<List<PlayerRidesDto>> GetGroupedRidesForTournament(int tournamentId)
        {
            var rides = await _context.Rides
                .Include(r => r.RideGroup.Class)
                .Include(r => r.RideGroup.Player)
                    .ThenInclude(r => r.School)
                .Include(r => r.Gokart)
                .Where(r => r.RideGroup.TournamentId == tournamentId)
                .ToListAsync();

            var groupedRides = rides
                .GroupBy(r => r.RideGroup.Player)
                .Select(g => new PlayerRidesDto
                {
                    Player = g.Key,
                    Times = g.Select(r => new RideInfoDto
                    {
                        RideId = r.RideId,
                        Time = r.Time,
                        Gokart = r.Gokart,
                        RideNumber = r.RideNumber,
                        IsDSQ = r.IsDisqualified,
                    }).OrderBy(z => z.RideNumber).ToList()
                })
                .OrderBy(z => z.Player.PlayerId).ToList();

            return groupedRides;
        }

        public async Task<Ride?> GetAsync(int rideId)
        {
            return await _context.Rides.FindAsync(rideId)!;
        }

        public async Task<int?> FindRideNumberAsync(int tournamentId, int playerId)
        {
            return await _context.Rides
                .Where(r => r.RideGroup.TournamentId == tournamentId)
                .Where(r => r.RideGroup.Player.PlayerId == playerId)
                .CountAsync() + 1;
        }

        public async Task<int> CreateRideGroupAsync(int tournamentId, int playerId)
        {
            var rg = await _context.AddAsync(new RideGroup()
            {
                TournamentId = tournamentId,
                PlayerId = playerId,
                ClassId = (int)(await _context.Players.Where(p => p.PlayerId == playerId).FirstAsync()).ClassId!
            });
            await _context.SaveChangesAsync();
            return rg.Entity.RideGroupId;
        }

        public async Task<RideGroup?> GetRideGroupIfExists(int tournamentId, int playerId)
        {
            return await _context.RideGroups.Where(rg => rg.TournamentId == tournamentId && rg.PlayerId == playerId)
                .FirstOrDefaultAsync();
        }
    }
}