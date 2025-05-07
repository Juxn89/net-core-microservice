using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.API.Library.Core.Entities;

namespace Services.API.Library.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthorsController : ControllerBase
  {
    private readonly IMongoRepository<AuthorEntity> _authorGenericRepository;

    public AuthorsController(IMongoRepository<AuthorEntity> authorGenericRepository)
    {
      _authorGenericRepository = authorGenericRepository;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var authors = await _authorGenericRepository.GetAll();
      return Ok(authors);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
      var author = await _authorGenericRepository.GetById(id);
      if (author == null)
        return NotFound();

      return Ok(author);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] AuthorEntity author)
    {
      if (author == null)
        return BadRequest();

      await _authorGenericRepository.Save(author);
      return CreatedAtAction(nameof(Get), new { id = author.Id }, author);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, [FromBody] AuthorEntity author)
    {
      if (author == null)
        return BadRequest();

      await _authorGenericRepository.Update(id, author);
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
      var author = await _authorGenericRepository.GetById(id);
      if (author == null)
        return NotFound();

      await _authorGenericRepository.Delete(id);
      return NoContent();
    }
  }
}
