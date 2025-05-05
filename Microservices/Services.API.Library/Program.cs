using Services.API.Library.Core;
using Services.API.Library.Core.ContextMongoDB;
using Services.API.Library.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MongoSettings>(options => { 
  options.ConnectionString = builder.Configuration.GetSection("MongoDB:ConnectionString").Value;
  options.Database = builder.Configuration.GetSection("MongoDB:Database").Value;
});

builder.Services.AddSingleton<MongoSettings>();
builder.Services.AddTransient<IAuthorContext,AuthorContext>();

builder.Services.AddTransient<IAuthorRepository, AuthorRepository>();

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
