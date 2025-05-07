using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Services.API.Library.Core.Entities
{
  public class MongoRepository<TDocument> : IMongoRepository<TDocument> where TDocument : class, IDocument
  {
    private readonly IMongoCollection<TDocument> _collection;

    public MongoRepository(IOptions<MongoSettings> settings)
    {
      var client = new MongoClient(settings.Value.ConnectionString);
      var database = client.GetDatabase(settings.Value.Database);
      _collection = database.GetCollection<TDocument>( GetCollectionName(typeof(TDocument)) );
    }

    public async Task Delete(string id)
    {
      var filter = Builders<TDocument>.Filter.Eq("Id", id);
      await _collection.DeleteOneAsync(filter);
    }

    public async Task<IEnumerable<TDocument>> GetAll()
    {
      return await _collection.Find(x => true).ToListAsync();
    }

    public async Task<TDocument> GetById(string id)
    {
      var filter = Builders<TDocument>.Filter.Eq("Id", id);
      return await _collection.Find(filter).FirstOrDefaultAsync();
    }

    public async Task Save(TDocument documento)
    {
      await _collection.InsertOneAsync(documento);
    }

    public async Task Update(string id, TDocument documento)
    {
      var filter = Builders<TDocument>.Filter.Eq("Id", id);

      documento.Id = id;
      await _collection.FindOneAndReplaceAsync(filter, documento);
    }

    private protected string GetCollectionName(Type documentType)
    {
      return ((BsonCollectionAttributte) documentType.GetCustomAttributes(typeof (BsonCollectionAttributte), true).FirstOrDefault()).CollectionName;
    }
  }
}
