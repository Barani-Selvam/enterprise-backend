using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication_React.Data;
using WebApplication_React.Dto;
using WebApplication_React.Interfaces;
using WebApplication_React.Models;

namespace WebApplication_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly ICategoryService _categoryService;

        public ProductsController(IProductService service, ICategoryService categoryService)
        {
            _service = service;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _service.GetProductsAsync();

            return Ok(products);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateProductDto dto)
        {
            await _service.AddProductAsync(dto);
            return Ok(dto);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateProductDto dto)
        {
            if (id != dto.Id)
                return BadRequest("ID mismatch");

            var success = await _service.UpdateProductAsync(dto);

            if (!success)
                return NotFound();

            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteProductAsync(id);

            if (!success)
                return NotFound();

            return Ok();
        }

        [Authorize]
        [HttpPost("bulk")]
        public async Task<IActionResult> BulkInsert([FromBody] List<CreateProductDto> products)
        {
            if (products == null || products.Count == 0)
                return BadRequest("Product list is empty");

            await _service.AddProductsBulkAsync(products);

            return Ok(new
            {
                message = $"{products.Count} products inserted successfully"
            });
        }
    }
}
