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

        public async Task<Ride> UpdateAsync(Ride data)
        {
            data.RideGroup = null;
            data.Gokart = null;
            _context.Rides.Update(data);
            await _context.SaveChangesAsync();
            return data;
        }

        public async Task<int?> RemoveAsync(int rideId)
        {
            if (await _context.Rides.FindAsync(rideId) is Ride ride &&
                await _context.RideGroups.Include(rg => rg.Rides).FirstOrDefaultAsync(rg => rg.Rides.Select(r => r.RideId).Contains(rideId)) is RideGroup rideGroup)
            {
                _context.Rides.Remove(ride);
                if (rideGroup.Rides.Count == 1)
                    _context.RideGroups.Remove(rideGroup);
                else
                    await _context.Rides.Where(r => r.RideNumber > ride.RideNumber).ForEachAsync(r => r.RideNumber--);
                await _context.SaveChangesAsync();
                return rideId;
            }
            return null;
        }

        public async Task<List<RideWithGroupDto>> GetBestForTournamentAsync(int tournamentId)
        {
            return await _context.RideGroups
                .Where(rg => rg.TournamentId == tournamentId)
                .Where(rg => rg.Rides.Count > 0)
                .Select(rg => new RideWithGroupDto {
                    Tournament = rg.Tournament,
                    Player = rg.Player,
                    Class = new Class() {
                        ClassId = rg.ClassId,
                        Name = rg.Class.Name,
                        School = new School() {
                            SchoolId = rg.Class.SchoolId,
                            Name = rg.Class.School.Name,
                            City = rg.Class.School.City,
                            Acronym = rg.Class.School.Acronym
                        }
                    },
                    Ride = rg.Rides
                        .OrderBy(r => r.IsDisqualified)
                            .ThenBy(r => r.Time)
                        .Select(r => new Ride() {
                            RideId = r.RideId,
                            RideNumber = r.RideNumber,
                            IsDisqualified = r.IsDisqualified,
                            PenaltyPoints = r.PenaltyPoints,
                            Time = r.Time,
                            Gokart = r.Gokart,
                        })
                        .FirstOrDefault()!
                })
                .OrderBy(rg => rg.Ride.IsDisqualified)
                    .ThenBy(rg => rg.Ride.Time)
                .ToListAsync();
        }

        public async Task<RideWithGroupDto?> GetLastAddedForTournamentAsync(int tournamentId) {
            return await _context.RideGroups
                .Where(rg => rg.TournamentId == tournamentId)
                .Where(rg => rg.Rides.Count > 0)
                .OrderByDescending(rg => rg.Rides.OrderByDescending(r => r.RideId).FirstOrDefault())
                .Select(rg => new RideWithGroupDto
                {
                    Tournament = rg.Tournament,
                    Player = rg.Player,
                    Class = new Class() {
                        ClassId = rg.ClassId,
                        Name = rg.Class.Name,
                        School = new School() {
                            SchoolId = rg.Class.SchoolId,
                            Name = rg.Class.School.Name,
                            City = rg.Class.School.City,
                            Acronym = rg.Class.School.Acronym
                        }
                    },
                    Ride = rg.Rides
                        .OrderByDescending(r => r.RideId)
                        .Select(r => new Ride()
                        {
                            RideId = r.RideId,
                            RideNumber = r.RideNumber,
                            IsDisqualified = r.IsDisqualified,
                            PenaltyPoints = r.PenaltyPoints,
                            Time = r.Time,
                            Gokart = r.Gokart,
                        }).FirstOrDefault()!
                }).FirstOrDefaultAsync();
        }

        public async Task<List<RideGroup>> GetRideGroupsForTournamentAsync(int tournamentId) {
            return await _context.RideGroups
                .Where(rg => rg.TournamentId == tournamentId)
                .Include(rg => rg.Tournament)
                .Include(rg => rg.Player)
                .Include(rg => rg.Class)
                    .ThenInclude(c => c.School)
                .Include(rg => rg.Rides)
                    .ThenInclude(r => r.Gokart)
                .ToListAsync();
        }

        public async Task<Ride?> GetAsync(int rideId) {
            return await _context.Rides.FindAsync(rideId)!;
        }

        public async Task<int> FindRideNumberAsync(int tournamentId, int playerId)
        {
            return await _context.Rides
                .Where(r => r.RideGroup.TournamentId == tournamentId)
                .Where(r => r.RideGroup.PlayerId == playerId)
                .CountAsync() + 1;
        }

        public async Task<RideGroup> GetRideGroupAsync(int tournamentId, int playerId, int classId) {
            if (await _context.RideGroups.FirstOrDefaultAsync(rg => rg.TournamentId == tournamentId && rg.PlayerId == playerId) is RideGroup rideGroup)
                return rideGroup;
            var newRideGroup = new RideGroup() {
                TournamentId = tournamentId,
                PlayerId = playerId,
                ClassId = classId
            };
            await _context.RideGroups.AddAsync(newRideGroup);
            await _context.SaveChangesAsync();
            return newRideGroup;
        }

        public Task<bool> ExistsAsync(int rideId) {
            return _context.Rides.AnyAsync(r => r.RideId == rideId);
        }
    }
}