namespace Services.API.Library.Core.Entities
{

  public enum SortDirection
  {
    Ascending,
    Descending
  }

  public class PaginationEntity<TDocument>
  {
    public int PageSize { get; set; }
    public int Page { get; set; }
    public string Sort { get; set; }
    public SortDirection SortDirection { get; set; }
    public string Filter { get; set; }
    public FilterValue FilterValue { get; set; }
    public int PageQuantity { get; set; }
    public IEnumerable<TDocument> Data { get; set; }
    public int TotalRecords { get; set; }
  }
}
