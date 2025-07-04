using Microsoft.AspNetCore.Identity;
using Services.API.Security.Core.Entities;

namespace Services.API.Security.Core.Persistence
{
  public class SecurityData
  {
    public static async Task SaveInitialUser(SecurityContext securityContext, UserManager<User> userManager) {
      if (!userManager.Users.Any())
      {
        var user = new User
        {
          Name = "Admin",
          LastName = "Admin",
          Address = "123 Admin St",
          UserName = "admin",
          Email = "admin@fake.com"
        };

        await userManager.CreateAsync(user, "MySuperPassword123!");
      } 
    }
  }
}
