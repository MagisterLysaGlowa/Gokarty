using System.IdentityModel.Tokens.Jwt;

namespace api.Interfaces
{
    public interface IJwtService
    {
        string Generate(int userId);
        JwtSecurityToken Verify(string jwt);
    }
}
