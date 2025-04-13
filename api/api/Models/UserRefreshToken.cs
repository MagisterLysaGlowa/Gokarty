using System.ComponentModel.DataAnnotations;

namespace api.Models {
    public class UserRefreshToken {
        [Key]
        public int RefreshTokenId { get; set; }
        public int UserId { get; set; }
        [Required]
        public string RefreshToken { get; set; } = null!;
        [Required]
        public DateTime ExpiryDate { get; set; }
        [Required]
        public string IpAddress { get; set; } = null!;
        public User User { get; set; } = null!;
    }

}
