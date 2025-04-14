using api.Data;
using api.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace api.Middlewares
{
    public class JwtCookieMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _secureKey;
        private readonly IServiceScopeFactory _serviceFactory;

        public JwtCookieMiddleware(RequestDelegate next, IServiceScopeFactory serviceFactory, IConfiguration config)
        {
            _next = next;
            _secureKey = config["Jwt:Key"]!;
            _serviceFactory = serviceFactory;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Sprawdzenie, czy istnieje ciasteczko AuthToken
            if (context.Request.Cookies.TryGetValue("AuthToken", out var token))
            {
                try
                {
                    using (var scope = _serviceFactory.CreateScope())
                    {
                        var appDbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                        // Ustawienia klucza i weryfikacja tokenu
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secureKey));
                        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var tokenHandler = new JwtSecurityTokenHandler();

                        var tokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = false,
                            ValidateAudience = false,
                            ValidateLifetime = true,
                            IssuerSigningKey = key
                        };

                        // Walidacja tokenu
                        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);

                        // Pobranie claimu "userId"
                        var userIdClaim = principal?.FindFirst("userId");

                        if (userIdClaim != null)
                        {
                            // Jeśli token jest poprawny, dodajemy userId do HttpContext
                            context.Items["userId"] = userIdClaim.Value;

                            // Kontynuujemy przetwarzanie żądania (przekazujemy dalej)
                            await _next(context);
                        }
                        else
                        {
                            // Jeśli token nie zawiera claimu "userId", zwróć odpowiedź Unauthorized
                            context.Response.StatusCode = 401; // Unauthorized
                            await context.Response.WriteAsync("Brak uprawnień: token nie zawiera userId.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Obsługa błędów (np. token jest niepoprawny)
                    context.Response.StatusCode = 401; // Unauthorized
                    await context.Response.WriteAsync($"Błąd weryfikacji tokenu: {ex.Message}");
                }
            }
            else
            {
                // Jeśli nie ma ciasteczka AuthToken, zwróć odpowiedź Unauthorized
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsync("Brak tokenu w ciasteczku.");
            }
        }
    }
}
