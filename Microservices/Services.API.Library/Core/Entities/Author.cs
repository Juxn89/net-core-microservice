using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Services.API.Library.Core.Entities
{
  public class Author
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("lastName")]
    public string LastName { get; set; }

    [BsonElement("academicDegree")]
    public string AcademicDegree { get; set; }
  }
}
