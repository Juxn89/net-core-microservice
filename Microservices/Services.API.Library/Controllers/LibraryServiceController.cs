using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.API.Library.Repository;

namespace Services.API.Library.Controllers
{
  [Route("api/[controller]", Name = "Library")]
  [ApiController]
  public class LibraryServiceController : ControllerBase
  {
    private readonly IAuthorRepository _authorRepository;

    public LibraryServiceController(IAuthorRepository authorRepository)
    {
      _authorRepository = authorRepository;
    }

    [HttpGet]
    [Route("authors")]
    public async Task<IActionResult> GetAuthors()
    {
      var authors = await _authorRepository.GetAuthors();
      return Ok(authors);
    }
  }
}
