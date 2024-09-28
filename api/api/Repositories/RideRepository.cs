﻿using api.Data;
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
        public Ride Create(Ride ride)
        {
            _context.Rides.Add(ride);
            _context.SaveChanges();
            return ride;
        }

        public Ride FullGet(int rideId)
        {
            var ride = _context.Rides.Include(r => r.Tournament).Include(r => r.Player).Include(r => r.Gokart).Where(r => r.RideId == rideId).FirstOrDefault();
            return ride!;
        }

        public List<Ride> FullGetAll()
        {
            var rides = _context.Rides.Include(r => r.Tournament).Include(r => r.Player).Include(r => r.Gokart).ToList();
            return rides;
        }

        public Ride Get(int rideId)
        {
            return _context.Rides.Find(rideId)!;
        }

        public List<Ride> GetAll()
        {
            return _context.Rides.ToList();
        }

        public int Remove(int rideId)
        {
            var ride = _context.Rides.Find(rideId);
            if (ride == null) return 0;
            _context.Rides.Remove(ride);
            _context.SaveChanges();
            return rideId;
        }

        public Ride Update(int rideId, Ride ride)
        {
            var ride_db = _context.Rides.Find(rideId);
            if (ride_db == null) return null!;

            ride_db.TournamentId = ride.TournamentId;
            ride_db.PlayerId = ride.PlayerId;
            ride_db.GokartId = ride.GokartId;
            ride_db.Time = ride.Time;
            ride_db.RideNumber = ride.RideNumber;

            _context.Rides.Update(ride_db);
            _context.SaveChanges();
            return ride_db;

        }
    }
}