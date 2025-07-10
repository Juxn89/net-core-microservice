namespace Services.API.Security.Core.Record
{
  public record UserRecord
  {
    public string Id { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public string Email { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
    public string Token { get; set; }
  }
}
