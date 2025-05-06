using MongoDB.Bson.Serialization.Attributes;

namespace Services.API.Library.Core.Entities
{
  [BsonCollectionAttributte("Authors")]
  public class AuthorEntity : Document
  {
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("lastName")]
    public string LastName { get; set; }

    [BsonElement("degree")]
    public string Degree { get; set; }
  }
}
