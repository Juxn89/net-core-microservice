namespace Services.API.Library.Core.Entities
{
  public interface IMongoRepository<TDocumento> where TDocumento : IDocument
  {
    Task<IEnumerable<TDocumento>> GetAll();

    Task<TDocumento> GetById(string id);

    Task Save(TDocumento documento);

    Task Update(string id, TDocumento documento);

    Task Delete(string id);
  }
}
