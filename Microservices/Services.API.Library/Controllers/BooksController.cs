using Microsoft.AspNetCore.Mvc;
using Services.API.Library.Core.Entities;

namespace Services.API.Library.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BooksController : ControllerBase
  {
    private readonly IMongoRepository<Books> _booksRepository;

    public BooksController(IMongoRepository<Books> booksRepository)
    {
      _booksRepository = booksRepository;
    }

    [HttpGet]
    public async Task<IActionResult> Get() { 
      return Ok(await _booksRepository.GetAll());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
      return Ok(await _booksRepository.GetById(id));
    }

    [HttpPost]
    public async Task<IActionResult> Post(Books book) { 
      await _booksRepository.Save(book);
      return Ok(book);
    }

    [HttpPost("pagination")]
    public async Task<IActionResult> pagination(PaginationEntity<Books> pagination) {
      var books = await _booksRepository.PaginationBy(pagination);
      return Ok(books);
    }
  }
}
