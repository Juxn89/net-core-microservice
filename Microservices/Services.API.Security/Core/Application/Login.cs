using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.JWT;
using Services.API.Security.Core.Persistence;
using Services.API.Security.Core.Record;

namespace Services.API.Security.Core.Application
{
  public class Login
  {
    public class LoginCommand : IRequest<UserRecord>
    {
      public string Email { get; set; } = string.Empty;
      public string Password { get; set; } = string.Empty;
    }

    public class LoginValidation : AbstractValidator<LoginCommand>
    {
      public LoginValidation()
      {
        RuleFor(x => x.Email).NotEmpty().WithMessage("Username is required.");
        RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required.");
      }
    }

    public class LoginHandler : IRequestHandler<LoginCommand, UserRecord>
    {
      private readonly SecurityContext _context;
      private readonly UserManager<User> _userManager;
      private readonly IJwtGenerator _jwtGenerator;
      private readonly IMapper _mapper;
      private readonly SignInManager<User> _singInManager;

      public LoginHandler(SecurityContext context, UserManager<User> user, IMapper mapper, IJwtGenerator jwtGenerator, SignInManager<User> singInManager)
      {
        _context = context;
        _userManager = user;
        _jwtGenerator = jwtGenerator;
        _mapper = mapper;
        _singInManager = singInManager;
      }

      public async Task<UserRecord> Handle(LoginCommand request, CancellationToken cancellationToken)
      {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
          throw new Exception("User not found");

        var signInResult = await _singInManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (signInResult.Succeeded) {
          var currentUser = _mapper.Map<User, UserRecord>(user);
          currentUser.Token = _jwtGenerator.CreateToken(user);
          return currentUser;
        }

        throw new Exception("Something went wrong!");
      }
    }
  }
}
