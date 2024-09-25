namespace api.Dtos
{
    public class TournamentDto
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TournamentStateId { get; set; }
    }
}
