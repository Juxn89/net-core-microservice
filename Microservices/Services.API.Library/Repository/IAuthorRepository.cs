using Services.API.Library.Core.Entities;

namespace Services.API.Library.Repository
{
  public interface IAuthorRepository
  {
    Task<IEnumerable<Author>> GetAuthors();
  }
}
