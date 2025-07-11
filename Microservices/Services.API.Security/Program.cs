using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.API.Security.Core.Application;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.JWT;
using Services.API.Security.Core.Maps;
using Services.API.Security.Core.Persistence;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
  .AddControllers()
  .AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<Register>());

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

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Program>());
builder.Services.AddAutoMapper(config => config.AddProfile<MappingProfile>());

builder.Services.AddScoped<IJwtGenerator, JWTGenerator>();
builder.Services.AddScoped<IUserSession, UserSession>();

var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = jwtKey,
      ValidateAudience = false,
      ValidateIssuer = false,
    };
  });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseAuthentication();

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
