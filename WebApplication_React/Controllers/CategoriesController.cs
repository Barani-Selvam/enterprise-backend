using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication_React.Interfaces;
using WebApplication_React.Models;

namespace WebApplication_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _service.GetAllAsync();
            return Ok(categories);
        }

        // POST: api/categories
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create(Category category)
        {
            var created = await _service.CreateAsync(category);
            return Ok(created);
        }

        // DELETE: api/categories/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);

            if (!success)
                return NotFound();

            return Ok();
        }
    }
}
