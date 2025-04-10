using System.ComponentModel.DataAnnotations;

namespace api.Models {
    public class UserRefreshToken {
        [Key]
        public int RefreshTokenId { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateTime ExpiryDate { get; set; }
        [Required]
        public string IpAddress { get; set; } = "";
        public User User { get; set; }
    }
}
