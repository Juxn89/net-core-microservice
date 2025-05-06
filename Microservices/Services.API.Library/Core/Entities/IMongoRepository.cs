namespace Services.API.Library.Core.Entities
{
  public interface IMongoRepository<TDocumento> where TDocumento : class
  {
    Task<IEnumerable<TDocumento>> GetAll();
  }
}
