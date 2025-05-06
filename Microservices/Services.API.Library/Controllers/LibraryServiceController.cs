using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.API.Library.Core.Entities;
using Services.API.Library.Repository;

namespace Services.API.Library.Controllers
{
  [Route("api/Library")]
  [ApiController]
  public class LibraryServiceController : ControllerBase
  {
    private readonly IAuthorRepository _authorRepository;
    private readonly IMongoRepository<AuthorEntity> _authorGenericRepository;

    public LibraryServiceController(IAuthorRepository authorRepository, IMongoRepository<AuthorEntity> authorGenericRepository)
    {
      _authorRepository = authorRepository;
      _authorGenericRepository = authorGenericRepository;
    }

    [HttpGet]
    [Route("authors")]
    public async Task<IActionResult> GetAuthors()
    {
      var authors = await _authorRepository.GetAuthors();
      return Ok(authors);
    }

    [HttpGet]
    [Route("authors-generic")]
    public async Task<IActionResult> GetAuthorsGeneric()
    {
      var authors = await _authorGenericRepository.GetAll();
      return Ok(authors);
    }
  }
}
