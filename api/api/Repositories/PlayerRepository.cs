﻿using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly AppDbContext _context;

        public PlayerRepository(AppDbContext context)
        {
            _context = context;
        }
        public Player Create(Player player, int tournamentId)
        {
            var tournament = _context.Tournaments.Find(tournamentId);
            if (tournament == null) return null!;
            _context.Add(player);
            tournament?.PlayerTournaments.Add(new PlayerTournament { Player = player });
            _context.SaveChanges();
            return player;
        }

        public Player Get(int playerId)
        {
            var player = _context.Players.Find(playerId);
            if(player == null) return null!;
            return player;
        }

        public List<Player> GetAll()
        {
            var players = _context.Players.ToList();
            if(players == null) return null!;
            return players;
        }

        public List<Player> GetAllForTournament(int tournamentId)
        {
            var players = _context.PlayerTournaments.Where(pt => pt.TournamentsId == tournamentId).Select(pt => pt.Player).ToList();
            return players;
        }

        public PlayerSchool GetPlayerWithSchool(int playerId)
        {
            var player = _context.Players.Include(p => p.School)
                                         .FirstOrDefaultAsync(p => p.PlayerId == playerId).Result;
            if (player == null) return null!;
            var playerSchool = new PlayerSchool
            {
                PlayerId = player.PlayerId,
                Name = player.Name,
                Surname = player.Surname,
                BirthDate = player.BirthDate,
                SchoolId = player.SchoolId,
                SchoolName = player.School.Name,
                City = player.School.City,
                Acronym = player.School.Acronym,
            };
            return playerSchool;
        }

        public int Remove(int playerId)
        {
            var player = _context.Players.Find(playerId);
            if (player == null) return 0;
            _context.Remove(player);
            _context.SaveChanges();
            return playerId;
        }

        public Player Update(int playerId, Player player)
        {
            var player_db = _context.Players.Find(playerId);
            if(player_db == null) return null!;

            player_db.Name = player.Name;
            player_db.Surname = player.Surname;
            player_db.BirthDate = player.BirthDate;
            player_db.SchoolId = player.SchoolId;

            _context.Players.Update(player_db);
            _context.SaveChanges();
            return player_db;
        }
    }
}
