using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string Login { get; set; } = String.Empty;
        [Required]
        public string Password { get; set; } = String.Empty;
        [Required]
        public string Email { get; set; }=String.Empty;
        [JsonIgnore]
        public ICollection<UserRefreshToken> UserRefreshTokens { get; set; } = [];
    }
}
