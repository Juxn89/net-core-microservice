﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Services.API.Library.Core.Entities
{
  public class Document : IDocument
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public DateTime CreatedDate => DateTime.Now;
  }
}
