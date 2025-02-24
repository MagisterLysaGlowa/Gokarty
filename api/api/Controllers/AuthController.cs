using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly IUserRepository userRepository;
        private readonly IJwtService jwtService;
        private readonly IWebHostEnvironment hostEnvironment;
        public AuthController(IUserRepository userRepository, IJwtService jwtService, IWebHostEnvironment hostEnvironment) {
            this.userRepository = userRepository;
            this.jwtService = jwtService;
            this.hostEnvironment = hostEnvironment;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto) {
            var user = new User() {
                Login = dto.Login,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Access = "user"
            };

            return Created("",await userRepository.CreateAsync(user));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto) {
            var user = await userRepository.GetByLoginAsync(dto.Login!);
            if (user == null)
                return BadRequest(new { message = "Invalid Credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password)) {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = jwtService.Generate(user.UserId);

            Response.Cookies.Append("jwt", jwt, new CookieOptions {
                HttpOnly = true
            });

            return Ok(new {
                message = "success"
            });
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserByJwt() {
            try {
                var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt!);

                int userId = int.Parse(token.Issuer);

                var user =await userRepository.GetByIdAsync(userId);

                return Ok(user);
            } catch (Exception) {
                return Ok(null);
            }
        }

        [HttpGet("loginIsFree/{login}")]
        public async Task<IActionResult> CheckIfLoginIsFree(string login) {
            try {
                return Ok(await userRepository.LoginFreeAsync(login));
            } catch (Exception ex) {
                return BadRequest();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout() {
            Response.Cookies.Delete("jwt");

            return Ok("Success");
        }
    }
}

