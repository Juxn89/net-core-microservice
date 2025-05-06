using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Services.API.Library.Core.Entities
{
  public class MongoRepository<TDocument> : IMongoRepository<TDocument> where TDocument : class
  {
    private readonly IMongoCollection<TDocument> _collection;

    public MongoRepository(IOptions<MongoSettings> settings)
    {
      var client = new MongoClient(settings.Value.ConnectionString);
      var database = client.GetDatabase(settings.Value.Database);
      _collection = database.GetCollection<TDocument>( GetCollectionName(typeof(TDocument)) );
    }

    public async Task<IEnumerable<TDocument>> GetAll()
    {
      return await _collection.Find(x => true).ToListAsync();
    }

    private protected string GetCollectionName(Type documentType)
    {
      return ((BsonCollectionAttributte) documentType.GetCustomAttributes(typeof (BsonCollectionAttributte), true).FirstOrDefault()).CollectionName;
    }
  }
}
