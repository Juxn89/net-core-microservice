using MongoDB.Driver;
using Services.API.Library.Core.ContextMongoDB;
using Services.API.Library.Core.Entities;

namespace Services.API.Library.Repository
{
  public class AuthorRepository : IAuthorRepository
  {
    private readonly IAuthorContext _authorContext;
    public AuthorRepository(IAuthorContext authorContext) {
      _authorContext = authorContext;
    }

    public async Task<IEnumerable<Author>> GetAuthors()
    {
      return await _authorContext.Author.Find(_ => true).ToListAsync();
    }
  }
}
