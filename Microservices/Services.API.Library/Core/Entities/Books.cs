
using MongoDB.Bson.Serialization.Attributes;

namespace Services.API.Library.Core.Entities
{
  [BsonCollectionAttributte("Books")]
  public class Books : Document
  {
    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("price")]
    public double Price { get; set; }

    [BsonElement("publishDate")]
    public DateTime? PublishDate { get; set; }

    [BsonElement("author")]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Author { get; set; }

    [BsonIgnore]
    public AuthorEntity AuthorName { get; set; }
  }
}
