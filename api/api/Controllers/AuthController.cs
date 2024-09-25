using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly IJwtService jwtService;
        private readonly IWebHostEnvironment hostEnvironment;
        public AuthController(IUserRepository userRepository, IJwtService jwtService, IWebHostEnvironment hostEnvironment)
        {
            this.userRepository = userRepository;
            this.jwtService = jwtService;
            this.hostEnvironment = hostEnvironment;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User()
            {
                Login = dto.Login,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            return Created("success", userRepository.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = userRepository.GetByLogin(dto.Login);
            if (user == null) return BadRequest(new { message = "Invalid Credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = jwtService.Generate(user.UserId);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpGet("user")]
        public IActionResult GetUserByJwt()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = userRepository.GetById(userId);

                return Ok(user);
            }
            catch (Exception)
            {
                return Ok(null);
            }
        }

        [HttpGet("loginIsFree/{email}")]
        public IActionResult CheckIfEmailIsFree(string login)
        {
            try
            {
                return Ok(userRepository.LoginFree(login));
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }
    }
}

