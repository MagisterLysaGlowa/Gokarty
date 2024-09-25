namespace api.Models
{
    public class School
    {
        public int SchoolId { get; set; }
        public string? Name { get; set; }
        public string? City { get; set; }
        public string? Acronym { get; set; }
        public ICollection<Player> Players { get; } = default!;

    }
}
