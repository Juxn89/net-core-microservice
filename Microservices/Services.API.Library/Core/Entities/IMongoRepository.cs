using System.Linq.Expressions;

namespace Services.API.Library.Core.Entities
{
  public interface IMongoRepository<TDocumento> where TDocumento : IDocument
  {
    Task<IEnumerable<TDocumento>> GetAll();

    Task<TDocumento> GetById(string id);

    Task Save(TDocumento documento);

    Task Update(string id, TDocumento documento);

    Task Delete(string id);

    Task<PaginationEntity<TDocumento>> PaginationBy(
      Expression<Func<TDocumento, bool>> filterExpression,
      PaginationEntity<TDocumento> paginationEntity
    );

    Task<PaginationEntity<TDocumento>> PaginationBy(
      PaginationEntity<TDocumento> paginationEntity
    );
  }
}
