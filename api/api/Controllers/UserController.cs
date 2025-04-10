using api.Data;
using api.Dtos;
using api.Helpers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace api.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase {
        private readonly AppDbContext _db;
        private readonly JwtService _jwtService;

        public UserController(AppDbContext db, JwtService jwtService) {
            _db = db;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User request) {
            if (await _db.Users.AnyAsync(u => u.Login == request.Login))
                return BadRequest("Login already exists");

            var user = new User {
                Login = request.Login,
                Password = HashPassword(request.Password),
                Email = request.Email,
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok("User registered");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto request) {
            var user = await _db.Users
                .FirstOrDefaultAsync(u => u.Login == request.LoginOrEmail || u.Email == request.LoginOrEmail);

            if (user == null || !VerifyPassword(request.Password, user.Password))
                return Unauthorized("Invalid credentials");

            var accessToken = _jwtService.Generate(user.UserId);
            var refreshToken = GenerateRefreshToken();

            _db.UserRefreshTokens.Add(new UserRefreshToken {
                UserId = user.UserId,
                RefreshTokenId = 0,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown"
            });

            await _db.SaveChangesAsync();

            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });

            Response.Cookies.Append("accessToken", accessToken, new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(15)
            });

            return Ok("Dzialam");
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh() {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("Missing refresh token");

            var storedToken = await _db.UserRefreshTokens
                .Include(r => r.User)
                .Where(r => r.IpAddress == HttpContext.Connection.RemoteIpAddress.ToString())
                .OrderByDescending(r => r.ExpiryDate)
                .FirstOrDefaultAsync();

            if (storedToken == null || storedToken.ExpiryDate < DateTime.UtcNow)
                return Unauthorized("Refresh token expired or not found");

            var newAccessToken = _jwtService.Generate(storedToken.UserId);
            return Ok(new { accessToken = newAccessToken });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout() {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("No refresh token found");

            var userIp = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

            var storedToken = await _db.UserRefreshTokens
                .FirstOrDefaultAsync(r =>
                    r.IpAddress == userIp &&
                    r.ExpiryDate > DateTime.UtcNow);

            if (storedToken != null) {
                _db.UserRefreshTokens.Remove(storedToken);
                await _db.SaveChangesAsync();
            }

            Response.Cookies.Delete("refreshToken");
            Response.Cookies.Delete("accessToken");

            return Ok("Logged out successfully");
        }

        private string HashPassword(string password) {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private bool VerifyPassword(string input, string hashed) {
            return HashPassword(input) == hashed;
        }

        private string GenerateRefreshToken() {
            var bytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            return Convert.ToBase64String(bytes);
        }
    }
}
