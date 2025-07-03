using Microsoft.AspNetCore.Mvc;
using Services.API.Library.Core.Entities;

namespace Services.API.Library.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class BooksController : ControllerBase
  {
    private readonly IMongoRepository<Books> _booksRepository;
    private readonly IMongoRepository<AuthorEntity> _authorsRepository;

    public BooksController(IMongoRepository<Books> booksRepository, IMongoRepository<AuthorEntity> authorsRepository)
    {
      _booksRepository = booksRepository;
      _authorsRepository = authorsRepository;
    }

    [HttpGet]
    public async Task<IActionResult> Get() {
      var books = (await _booksRepository.GetAll()).ToList();
      var authorIds = books.Select(b => b.Author).Distinct().ToList();
      var authors = (await _authorsRepository.GetAll())
        .Where(a => authorIds.Contains(a.Id))
        .ToDictionary(a => a.Id);

      foreach (var book in books)
      {
        if (book.Author != null && authors.TryGetValue(book.Author, out var author))
        {
          book.AuthorName = author;
        }
      }

      return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
      var book = await _booksRepository.GetById(id);
      if (book == null) return NotFound();

      if (!string.IsNullOrEmpty(book.Author))
      {
        var author = await _authorsRepository.GetById(book.Author);
        book.AuthorName = author;
      }

      return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Books book) { 
      await _booksRepository.Save(book);
      return Ok(book);
    }

    [HttpPost("pagination")]
    public async Task<IActionResult> pagination(PaginationEntity<Books> pagination) {
      var booksPage = await _booksRepository.PaginationBy(pagination);
      var books = booksPage.Data.ToList();
      var authorIds = books.Select(b => b.Author).Distinct().ToList();
      var authors = (await _authorsRepository.GetAll())
        .Where(a => authorIds.Contains(a.Id))
        .ToDictionary(a => a.Id);

      foreach (var book in books)
      {
        if (book.Author != null && authors.TryGetValue(book.Author, out var author))
        {
          book.AuthorName = author;
        }
      }

      booksPage.Data = books;
      return Ok(booksPage);
    }
  }
}
