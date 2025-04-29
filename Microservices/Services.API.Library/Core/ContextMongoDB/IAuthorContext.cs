using MongoDB.Driver;
using Services.API.Library.Core.Entities;

namespace Services.API.Library.Core.ContextMongoDB
{
  public interface IAuthorContext
  {
    IMongoCollection<Author> Author { get; }
  }
}
