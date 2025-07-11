using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Services.API.Security.Core.Entities;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Services.API.Security.Core.JWT
{
  public class JWTGenerator : IJwtGenerator
  {
    private readonly string _jwtKey;

    public JWTGenerator(IConfiguration configuration) {
      _jwtKey = configuration["Jwt:Key"];
    }

    public string CreateToken(User user)
    {
      var claims = new List<Claim>
      {
        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim("username", user.UserName),
        new Claim("name", user.Name),
        new Claim("lastName", user.LastName)
      };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));
      var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = credentials
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}
