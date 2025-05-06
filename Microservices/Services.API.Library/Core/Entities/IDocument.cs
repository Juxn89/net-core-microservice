using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Services.API.Library.Core.Entities
{
  public interface IDocument
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    ObjectId Id { get; set; }

    DateTime CreatedDate { get; }
  }
}
