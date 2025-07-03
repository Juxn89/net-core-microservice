using Microsoft.AspNetCore.Identity;

namespace Services.API.Security.Core.Entities
{
  public class User : IdentityUser
  {
    public string Name { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
  }
}
