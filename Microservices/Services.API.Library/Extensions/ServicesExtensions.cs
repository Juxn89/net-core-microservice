using Services.API.Library.Core.ContextMongoDB;
using Services.API.Library.Core.Entities;
using Services.API.Library.Core;
using Services.API.Library.Repository;

namespace Services.API.Library.Extensions
{
  public static class ServicesExtensions
  {
    public static IServiceCollection AddServices(this IServiceCollection services, WebApplicationBuilder builder)
    {

      services.AddCors(options =>
      {
        options.AddPolicy("CorsPolicy",
          builder =>
          {
            builder.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
          });
      });

      services.Configure<MongoSettings>(options => {
        options.ConnectionString = builder.Configuration.GetSection("MongoDB:ConnectionString").Value;
        options.Database = builder.Configuration.GetSection("MongoDB:Database").Value;
      });

      services.AddSingleton<MongoSettings>();
      services.AddTransient<IAuthorContext, AuthorContext>();

      services.AddTransient<IAuthorRepository, AuthorRepository>();
      services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));

      return services;
    }
  }
}
