using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly SignInManager<User> signInManager;
        public AuthController(RoleManager<Role> roleManager, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto data)
        {
            if (data.Password != data.PasswordRepeat)
                return Unauthorized();


            var existingUser = await userManager.FindByNameAsync(data.UserName);
            if (existingUser is not null)
                return Conflict();


            User user = new()
            {
                Email = data.Email,
                UserName = data.UserName
            };

            var result = await userManager.CreateAsync(user, data.Password);

            if (!result.Succeeded)
                return Unauthorized();

            //TODO: do zmiany
            await userManager.AddToRoleAsync(user, "Admin");
            return Created("", "Zarejestrowano pomyślnie");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto data)
        {
            var user = await userManager.FindByNameAsync(data.LoginOrEmail)
                ?? await userManager.FindByEmailAsync(data.LoginOrEmail);


            if (user is null)
                return Unauthorized(new { message = "Nieprawidłowe dane logowania." });

            var passwordValid = await userManager.CheckPasswordAsync(user, data.Password);
            if (!passwordValid)
                return Unauthorized(new { message = "Nieprawidłowe dane logowania." });

            await signInManager.SignInAsync(user, false);

            var roleNames = await userManager.GetRolesAsync(user);
            var rolesWithId = roleManager.Roles
                .Where(role => roleNames.Contains(role.Name!))
                .Select(role => new
                {
                    id = role.Id,
                    name = role.Name
                })
                .ToList();


            return Ok(
                new
                {
                    id = user.Id,
                    email = user.Email,
                    username = user.UserName,
                    roles = rolesWithId
                }
                );
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }
        [HttpPost("isUserLoggedIn")]
        public async Task<IActionResult> IsUserLoggedIn()
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();

            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
                return NotFound();

            var roleNames = await userManager.GetRolesAsync(user);
            var rolesWithId = roleManager.Roles
                .Where(role => roleNames.Contains(role.Name!))
                .Select(role => new
                {
                    id = role.Id,
                    name = role.Name
                })
                .ToList();

            return Ok(new
            {
                id = user.Id,
                email = user.Email,
                username = user.UserName,
                roles = rolesWithId
            });
        }

    }
    public class LoginDto
    {
        public string LoginOrEmail { get; set; }
        public string Password { get; set; }
    }

    public class RegisterDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordRepeat { get; set; }
    }
}
