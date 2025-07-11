using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.API.Security.Core.Application;
using Services.API.Security.Core.Record;
using static Services.API.Security.Core.Application.Login;
using static Services.API.Security.Core.Application.Register;

namespace Services.API.Security.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {

    private readonly IMediator _mediator;
    public UserController(IMediator mediator)
    {
      _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterCommand userRecord)
    {
      var user = await _mediator.Send(userRecord);

      return Ok(user);
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand userRecord)
    {
      var user = await _mediator.Send(userRecord);

      return Ok(user);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var user = await _mediator.Send(new CurrentUser.CurrentUserCommand());

      return Ok(user);
    }
  }
}
