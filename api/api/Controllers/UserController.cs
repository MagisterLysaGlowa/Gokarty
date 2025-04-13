using api.Data;
using api.Dtos;
using api.Helpers;
using api.Interfaces;
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
        private readonly IJwtService _jwtService;

        public UserController(AppDbContext db, IJwtService jwtService) {
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
                Email = request.Email
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
            var userIp = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

            _db.UserRefreshTokens.Add(new UserRefreshToken {
                UserId = user.UserId,
                RefreshToken = refreshToken,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                IpAddress = userIp
            });

            await _db.SaveChangesAsync();

            SetAuthCookies(accessToken, refreshToken);

            return Ok("Logged in");
        }

        [HttpGet("refresh")]
        public async Task<IActionResult> Refresh() {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("Missing refresh token");

            var userIp = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

            var storedToken = await _db.UserRefreshTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r =>
                    r.RefreshToken == refreshToken &&
                    r.IpAddress == userIp &&
                    r.ExpiryDate > DateTime.UtcNow);

            if (storedToken == null)
                return Unauthorized("Refresh token invalid or expired");

            var newAccessToken = _jwtService.Generate(storedToken.UserId);
            SetAccessTokenCookie(newAccessToken);

            return Ok("Access token refreshed");
        }


        [HttpPost("logout")]
        public async Task<IActionResult> Logout() {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return BadRequest("No refresh token found");

            var storedToken = await _db.UserRefreshTokens
                .FirstOrDefaultAsync(r =>
                    r.RefreshToken == refreshToken &&
                    r.ExpiryDate > DateTime.UtcNow);

            if (storedToken != null) {
                _db.UserRefreshTokens.Remove(storedToken);
                await _db.SaveChangesAsync();
            }

            Response.Cookies.Delete("refreshToken");
            Response.Cookies.Delete("accessToken");

            return Ok("Logged out successfully");
        }

        // Helpers
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

        private void SetAuthCookies(string accessToken, string refreshToken) {
            var accessOptions = new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(15)
            };

            var refreshOptions = new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("accessToken", accessToken, accessOptions);
            Response.Cookies.Append("refreshToken", refreshToken, refreshOptions);
        }

        private void SetAccessTokenCookie(string accessToken) {
            var accessOptions = new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(15)
            };

            Response.Cookies.Append("accessToken", accessToken, accessOptions);
        }
    }
}
