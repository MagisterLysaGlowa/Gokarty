using System.Text.Json.Serialization;

namespace api.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Login { get; set; } = String.Empty;
        [JsonIgnore]
        public string Password { get; set; } = String.Empty;
        public string Access { get; set; } = String.Empty;
    }
}
