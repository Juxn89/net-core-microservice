using Services.API.Security.Core.Entities;

namespace Services.API.Security.Core.JWT
{
  public interface IJwtGenerator
  {
    string CreateToken(User user);
  }
}
