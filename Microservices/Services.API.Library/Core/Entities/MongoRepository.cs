using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace Services.API.Library.Core.Entities;

public class MongoRepository<TDocument> : IMongoRepository<TDocument> where TDocument : class, IDocument
{
  private readonly IMongoCollection<TDocument> _collection;

  public MongoRepository(IOptions<MongoSettings> settings)
  {
    var client = new MongoClient(settings.Value.ConnectionString);
    var database = client.GetDatabase(settings.Value.Database);
    _collection = database.GetCollection<TDocument>(GetCollectionName(typeof(TDocument)));
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

  public async Task<PaginationEntity<TDocument>> PaginationBy(Expression<Func<TDocument, bool>> filterExpression, PaginationEntity<TDocument> paginationEntity)
  {
    var sort = Builders<TDocument>.Sort.Ascending(paginationEntity.Sort.ToString());

    if (paginationEntity.SortDirection == SortDirection.Descending)
      sort = Builders<TDocument>.Sort.Descending(paginationEntity.Sort.ToString());

    if (string.IsNullOrEmpty(paginationEntity.Filter))
      paginationEntity.Data = await _collection
        .Find(x => true)
        .Sort(sort)
        .Skip(this.GetSkipCount(paginationEntity))
        .Limit(paginationEntity.PageSize)
        .ToListAsync();
    else
      paginationEntity.Data = await _collection
        .Find(filterExpression)
        .Sort(sort)
        .Skip(this.GetSkipCount(paginationEntity))
        .Limit(paginationEntity.PageSize)
        .ToListAsync();

    paginationEntity.PageQuantity = await this.GetPageQuantity(paginationEntity);

    return paginationEntity;
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

  public async Task<PaginationEntity<TDocument>> PaginationBy(PaginationEntity<TDocument> paginationEntity)
  {
    int totalRecords = 0;
    var sort = Builders<TDocument>.Sort.Ascending(paginationEntity.Sort.ToString());

    if (paginationEntity.SortDirection == SortDirection.Descending)
      sort = Builders<TDocument>.Sort.Descending(paginationEntity.Sort.ToString());

    if (paginationEntity.FilterValue == null) {
      paginationEntity.Data = await _collection
        .Find(x => true)
        .Sort(sort)
        .Skip(this.GetSkipCount(paginationEntity))
        .Limit(paginationEntity.PageSize)
        .ToListAsync();

      totalRecords = (int)await GetTotalRecords();
    }
    else {
      var filterExpression = $".*{ paginationEntity.FilterValue.Value }.";
      var filter = Builders<TDocument>.Filter.Regex(paginationEntity.FilterValue.Key, new BsonRegularExpression(filterExpression, "i")); // i: non-case sensitive

      paginationEntity.Data = await _collection
        .Find(filter)
        .Sort(sort)
        .Skip(this.GetSkipCount(paginationEntity))
        .Limit(paginationEntity.PageSize)
        .ToListAsync();

      totalRecords = (int)await GetTotalRecords(filter);
    }

    paginationEntity.PageQuantity = await this.GetPageQuantity(paginationEntity);
    paginationEntity.TotalRecords = totalRecords;

    return paginationEntity;
  }

  private protected string GetCollectionName(Type documentType)
  {
    return ((BsonCollectionAttributte)documentType.GetCustomAttributes(typeof(BsonCollectionAttributte), true).FirstOrDefault()).CollectionName;
  }

  private protected int GetSkipCount(PaginationEntity<TDocument> paginationEntity) => paginationEntity.PageSize * (paginationEntity.Page - 1);

  private protected async Task<long> GetTotalRecords(FilterDefinition<TDocument>? filter = null)
  {
    if(filter != null)
      return   (await _collection.Find(filter).ToListAsync()).Count;

    return (await _collection.Find(FilterDefinition<TDocument>.Empty).ToListAsync()).Count;
  }

  private protected async Task<int> GetPageQuantity(PaginationEntity<TDocument> paginationEntity)
  {
    long totalDocuments = await GetTotalRecords();
    var totalPages = Convert.ToInt32(Math.Ceiling((double)totalDocuments / paginationEntity.PageSize));
    return totalPages;
  }
}
