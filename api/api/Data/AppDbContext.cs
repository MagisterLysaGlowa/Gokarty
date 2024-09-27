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

            modelBuilder.Entity<TournamentState>().HasData(
                new TournamentState() { TournamentStateId = 1, State = "Zaplanowane" },
                new TournamentState() { TournamentStateId = 2, State = "W trakcie" },
                new TournamentState() { TournamentStateId = 3, State = "Zakończone" }
            );
        }
    }
}
