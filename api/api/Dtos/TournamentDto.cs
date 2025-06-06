namespace api.Dtos
{
    public class TournamentDto
    {
        public string Tournament { get; set; } = String.Empty;
        public IFormFile? Image { get; set; }
    }
}
