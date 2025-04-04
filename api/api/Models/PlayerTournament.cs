namespace api.Models
{
    public class PlayerTournament
    {
        public int PlayersId { get; set; }
        public int TournamentsId { get; set; }
        public Player Player { get; set; } = default!;
        public Tournament Tournament { get; set; } = default!;
        
    }
}
