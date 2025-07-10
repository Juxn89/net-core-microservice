using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.JWT;
using Services.API.Security.Core.Persistence;
using Services.API.Security.Core.Record;

namespace Services.API.Security.Core.Application
{
  public class Register
  {
    public class UserRegisterCommand : IRequest<UserRecord> {
      public string Name { get; init; } = string.Empty;
      public string LastName { get; init; } = string.Empty;
      public string Username { get; init; } = string.Empty;
      public string Email { get; init; } = string.Empty;
      public string Password { get; init; } = string.Empty;
    }

    public class UserRegisterValidation : AbstractValidator<UserRegisterCommand> {
      public UserRegisterValidation() {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.LastName).NotEmpty();
        RuleFor(x => x.Username).NotEmpty();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        RuleFor(x => x.Email).NotEmpty().EmailAddress()
          .WithMessage("Please provide a valid email address.");
      }
    }

    public class UserRegisterHandler : IRequestHandler<UserRegisterCommand, UserRecord>
    {

      private readonly SecurityContext _context;
      private readonly UserManager<User> _userManager;
      private readonly IMapper _mapper;
      private readonly IJwtGenerator _jwtGenerator;

      public UserRegisterHandler(SecurityContext context, UserManager<User> userManager, IMapper mapper, IJwtGenerator jwtGenerator)
      {
        _context = context;
        _userManager = userManager;
        _mapper = mapper;
        _jwtGenerator = jwtGenerator;
      }

      public async Task<UserRecord> Handle(UserRegisterCommand request, CancellationToken cancellationToken)
      {
        var existEmail = await _context.Users.Where(x => x.Email == request.Email).AnyAsync();

        if (existEmail)
          throw new Exception("This email already exists in the database");

        var existUser = await _context.Users.Where(x => x.UserName == request.Username).AnyAsync();

        if (existUser)
          throw new Exception("This username already exists in the database");

        var user = new User {
          UserName = request.Username,
          Name = request.Name,
          LastName = request.LastName,
          Email = request.Email,
          NormalizedUserName = request.Username,
          Address = string.Empty
        };

        var newUser = await _userManager.CreateAsync(user, request.Password);
        if (newUser.Succeeded) { 
          var userResult = _mapper.Map<User, UserRecord>(user);
          userResult.Token = _jwtGenerator.CreateToken(user);
          return userResult;
        }

        throw new Exception("An error occurred while creating the user. Please try again.");
      }
    }
  }
}
