namespace Services.API.Security.Core.JWT
{
  public class UserSession : IUserSession
  {
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserSession(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public string GetUserSession()
    {
      var user = _httpContextAccessor.HttpContext?.User?.Claims?
        .FirstOrDefault(x => x.Type == "username")?.Value;

      return user ?? string.Empty;
    }
  }
}
