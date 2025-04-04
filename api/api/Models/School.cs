using System.Text.Json.Serialization;

namespace api.Models
{
    public class School
    {
        public int SchoolId { get; set; }
        public string Name { get; set; } = String.Empty;
        public string City { get; set; } = String.Empty;
        public string Acronym { get; set; } = String.Empty;
        [JsonIgnore]
        public ICollection<Class> Classes { get; } = [];

    }
}
