using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddOcelot();

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.UseOcelot().Wait();

app.Run();
