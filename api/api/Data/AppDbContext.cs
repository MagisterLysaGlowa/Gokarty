using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

            modelBuilder.Entity<TournamentState>().HasData(
                new TournamentState() { TournamentStateId = 1, State = "Zaplanowane" },
                new TournamentState() { TournamentStateId = 2, State = "W trakcie" },
                new TournamentState() { TournamentStateId = 3, State = "Zakończone" }
            );

            modelBuilder.Entity<RideStatus>().HasData(
                new RideStatus() { RideStatusId = 1, State = "Oczekuje"},
                new RideStatus() { RideStatusId = 2, State = "W trakcie" },
                new RideStatus() { RideStatusId = 3, State = "Zakończył" }
            );
        }
    }
}
