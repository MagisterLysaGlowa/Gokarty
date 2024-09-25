using api.Models;

namespace api.Dtos
{
    public class PlayerDto
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public int SchoolId { get; set; }
    }
}
