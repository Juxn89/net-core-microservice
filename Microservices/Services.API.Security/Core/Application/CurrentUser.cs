using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.JWT;
using Services.API.Security.Core.Record;

namespace Services.API.Security.Core.Application
{
  public class CurrentUser
  {
    public class CurrentUserCommand : IRequest<UserRecord> { }

    public class CurrentUserHandler : IRequestHandler<CurrentUserCommand, UserRecord>
    {
      private readonly UserManager<User> _userManager;
      private readonly IUserSession _userSession;
      private readonly IJwtGenerator _jwtGenerator;
      private readonly IMapper _mapper;

      public CurrentUserHandler(IUserSession userSession, UserManager<User> userManager, IJwtGenerator jwtGenerator, IMapper mapper)
      {
        _userSession = userSession;
        _userManager = userManager;
        _jwtGenerator = jwtGenerator;
        _mapper = mapper;
      }

      public async Task<UserRecord> Handle(CurrentUserCommand request, CancellationToken cancellationToken)
      {
        var currentUser = _userSession.GetUserSession();
        var user = await _userManager.FindByNameAsync(currentUser);

        if (user == null)
          throw new Exception("User not found");

        return _mapper.Map<User, UserRecord>(user) with
        {
          Token = _jwtGenerator.CreateToken(user)
        };
      }
    }
  }
}
