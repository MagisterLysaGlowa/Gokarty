using api.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Helpers {
    public class JwtService : IJwtService {
        private readonly string _secureKey;
        private readonly int _expiryMinutes;

        public JwtService(IConfiguration config) {
            _secureKey = config["Jwt:Key"] ?? throw new Exception("Brak klucza JWT w konfiguracji");
            _expiryMinutes = int.TryParse(config["Jwt:ExpiryMinutes"], out int minutes) ? minutes : 15;
        }

        public string Generate(int userId) {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secureKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("userId", userId.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public JwtSecurityToken Verify(string jwt) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secureKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero // brak dodatkowego czasu na spóźnienie tokena
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
