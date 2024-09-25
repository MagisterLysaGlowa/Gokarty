namespace api.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public int SchoolId { get; set; }
        public School School { get; set; } = default!;
        public List<PlayerTournament> PlayerTournaments { get; set; } = new();
    }
}
