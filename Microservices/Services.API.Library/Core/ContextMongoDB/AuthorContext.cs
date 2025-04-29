using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Services.API.Library.Core.Entities;

namespace Services.API.Library.Core.ContextMongoDB
{
  public class AuthorContext : IAuthorContext
  {
    private readonly IMongoDatabase _database;

    public AuthorContext(IOptions<MongoSettings> options) {
      var client = new MongoClient(options.Value.ConnectionString);
      _database = client.GetDatabase(options.Value.Database);
    }

    public IMongoCollection<Author> Author => _database.GetCollection<Author>("Authors");
  }
}
