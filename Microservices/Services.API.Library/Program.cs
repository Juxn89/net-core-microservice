using Microsoft.OpenApi.Models;
using Services.API.Library.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options => { 
  options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
  options.SwaggerDoc("v1", new OpenApiInfo{ 
    Title = "Library API",
    Version = "v1",
    Description = "Library API's documentation"
  });
});

builder.Services.AddServices(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
