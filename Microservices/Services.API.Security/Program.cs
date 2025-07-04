using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SecurityContext>(options => { 
  options.UseSqlServer(builder.Configuration.GetConnectionString("SecurityDB"));
});

builder.Services
  .AddIdentityCore<User>()
  .AddEntityFrameworkStores<SecurityContext>()
  .AddSignInManager<SignInManager<User>>();

builder.Services.AddSingleton<TimeProvider>(TimeProvider.System);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

await SeedDatabaseAsync(app);

app.Run();

async Task SeedDatabaseAsync(WebApplication app)
{
  using var scope = app.Services.CreateScope();
  var services = scope.ServiceProvider;
  try
  {
    var userManager = services.GetRequiredService<UserManager<User>>();
    var securityDbContext = services.GetRequiredService<SecurityContext>();
    await SecurityData.SaveInitialUser(securityDbContext, userManager);
  }
  catch (Exception e)
  {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "An error occurred while seeding the database.");
  }
}
