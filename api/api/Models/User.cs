using System.Text.Json.Serialization;

namespace api.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string? Login { get; set; }
        [JsonIgnore]
        public string? Password { get; set; }
        public string? Access { get; set; }
    }
}
