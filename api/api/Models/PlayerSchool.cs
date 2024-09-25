namespace api.Models
{
    public class PlayerSchool
    {
        public int PlayerId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public int SchoolId { get; set; }
        public string? SchoolName { get; set; }
        public string? City { get; set; }
        public string? Acronym { get; set; }
    }
}
