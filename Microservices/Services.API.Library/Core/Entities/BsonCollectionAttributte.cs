namespace Services.API.Library.Core.Entities
{
  [AttributeUsage(AttributeTargets.Class, Inherited = false)]
  public class BsonCollectionAttributte : Attribute
  {
    public string CollectionName { get; }
    public BsonCollectionAttributte(string collectionName)
    {
      CollectionName = collectionName;
    }
  }
}
