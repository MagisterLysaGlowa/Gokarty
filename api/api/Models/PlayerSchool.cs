namespace api.Models
{
    public class PlayerSchool
    {
        public int PlayerId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public School? School { get; set; }
    }
}
