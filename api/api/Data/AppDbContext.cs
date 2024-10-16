﻿using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data {
    public class AppDbContext :DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {

        }

        public DbSet<Gokart> Gokarts { get; set; } = default!;
        public DbSet<Player> Players { get; set; } = default!;
        public DbSet<PlayerTournament> PlayerTournaments { get; set; } = default!;
        public DbSet<School> Schools { get; set; } = default!;
        public DbSet<Tournament> Tournaments { get; set; } = default!;
        public DbSet<Ride> Rides { get; set; } = default!;
        public DbSet<RideStatus> RideStatuses { get; set; } = default!;
        public DbSet<Queue> Queues { get; set; } = default!;
        public DbSet<TournamentState> TournamentStates { get; set; } = default!;
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<TournamentType> TournamentTypes { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            /*PLAYER TO TOURNAMENT (MANY TO MANY)*/

            modelBuilder.Entity<PlayerTournament>()
                        .HasKey(pt => new { pt.PlayersId, pt.TournamentsId });

            modelBuilder.Entity<PlayerTournament>()
                        .HasOne(pt => pt.Player)
                        .WithMany(p => p.PlayerTournaments)
                        .HasForeignKey(pt => pt.PlayersId);

            modelBuilder.Entity<PlayerTournament>()
                        .HasOne(pt => pt.Tournament)
                        .WithMany(t => t.PlayerTournaments)
                        .HasForeignKey(pt => pt.TournamentsId);

            //PLAYER TO SCHOOL (ONE TO MANY)

            modelBuilder.Entity<Player>()
                        .HasOne(s => s.School)
                        .WithMany(p => p.Players)
                        .HasForeignKey(s => s.SchoolId);

            //TOURNAMENT TO TOURNAMENT STATE (ONE TO MANY)

            modelBuilder.Entity<Tournament>()
                        .HasOne(ts => ts.TournamentState)
                        .WithMany(t => t.Tournaments)
                        .HasForeignKey(ts => ts.TournamentStateId);

            //TOURNAMEN TO TOURNAMENT TYPE (ONE TO MANY)

            modelBuilder.Entity<Tournament>()
                        .HasOne(t=>t.TournamentType)
                        .WithMany(tt=>tt.Tournaments)
                        .HasForeignKey(t=>t.TournamentTypeId);

            //RIDE TO TOURNAMENT (ONE TO MANY)

            modelBuilder.Entity<Ride>()
                        .HasOne(r => r.Tournament)
                        .WithMany(t => t.Rides)
                        .HasForeignKey(r => r.TournamentId);

            //RIDE TO PLAYER (ONE TO MANY)

            modelBuilder.Entity<Ride>()
                        .HasOne(r => r.Player)
                        .WithMany(p => p.Rides)
                        .HasForeignKey(r => r.PlayerId);

            //RIDE TO GOKARTS (ONE TO MANY)

            modelBuilder.Entity<Ride>()
                        .HasOne(r => r.Gokart)
                        .WithMany(g => g.Rides)
                        .HasForeignKey(r => r.GokartId);

            //QUEUE TO TOURNAMENT (ONE TO MANY)

            modelBuilder.Entity<Queue>()
                        .HasOne(q => q.Tournament)
                        .WithMany(t => t.Queues)
                        .HasForeignKey(q => q.TournamentId);

            //QUEUE TO PLAYER (ONE TO MANY)

            modelBuilder.Entity<Queue>()
                        .HasOne(q => q.Player)
                        .WithMany(P => P.Queues)
                        .HasForeignKey(q => q.PlayerId);

            //QUEUE TO RIDE STATUS (ONE TO MANY)

            modelBuilder.Entity<Queue>()
                        .HasOne(q => q.RideStatus)
                        .WithMany(rs => rs.Queues)
                        .HasForeignKey(q => q.RideStatusId);

            //QUEUE TO GOKART (ONE TO MANY)

            modelBuilder.Entity<Queue>()
                        .HasOne(q => q.Gokart)
                        .WithMany(g => g.Queues)
                        .HasForeignKey(q => q.GokartId);

            modelBuilder.Entity<TournamentState>().HasData(
                new TournamentState() { TournamentStateId = 1, State = "Zaplanowane" },
                new TournamentState() { TournamentStateId = 2, State = "W trakcie" },
                new TournamentState() { TournamentStateId = 3, State = "Zakończone" }
            );

            modelBuilder.Entity<RideStatus>().HasData(
                new RideStatus() { RideStatusId = 1, State = "Oczekuje" },
                new RideStatus() { RideStatusId = 2, State = "W trakcie" },
                new RideStatus() { RideStatusId = 3, State = "Zakończył" }
            );

            modelBuilder.Entity<Gokart>().HasData(
                new Gokart() { GokartId = 1, Name = "Czarny 1" },
                new Gokart() { GokartId = 2, Name = "Czarny 2" }
            );

            modelBuilder.Entity<School>().HasData(
                new School() { SchoolId = 1, Name = "ZSTIO", Acronym = "ZSTIO", City = "Limanowa" }
            );

            modelBuilder.Entity<Player>().HasData(
                new Player() { PlayerId = 1, Name = "Maciej", Surname = "Traktor", BirthDate = new DateTime(2024, 10, 5, 12, 0, 0, DateTimeKind.Utc), SchoolId = 1 },
                new Player() { PlayerId = 2, Name = "Michalina", Surname = "Ciągnik", BirthDate = new DateTime(2024, 10, 5, 12, 0, 0, DateTimeKind.Utc), SchoolId = 1 }
            );
            modelBuilder.Entity<PlayerTournament>().HasData(
                new PlayerTournament() { PlayersId = 1, TournamentsId = 1 },
                new PlayerTournament() { PlayersId = 2, TournamentsId = 1 }
            );

            modelBuilder.Entity<TournamentType>().HasData(
                   new TournamentType() { TournamentTypeId = 1, Name = "Zapętlony" },
                   new TournamentType() { TournamentTypeId = 2, Name = "Nieskończony" }
            );

            modelBuilder.Entity<Tournament>().HasData(
                new Tournament() { TournamentId = 1, Name = "Wyścig", StartDate = new DateTime(2024, 10, 5, 12, 0, 0, DateTimeKind.Utc), EndDate = new DateTime(2024, 10, 5, 12, 0, 0, DateTimeKind.Utc), TournamentStateId = 1}
            );
        }
    }
}
