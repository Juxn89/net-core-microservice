using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Services.API.Security.Core.Entities;

namespace Services.API.Security.Core.Persistence
{
  public class SecurityContext : IdentityDbContext<User>
  {
    public SecurityContext(DbContextOptions options): base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
    }
  }
}
