using WebApplication_React.Dto;
using WebApplication_React.Interfaces;
using WebApplication_React.Models;

namespace WebApplication_React.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repo;

        public ProductService(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _repo.GetAllWithCategoryAsync();
        }

        public async Task AddProductAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                CategoryId = dto.CategoryId
            };

            await _repo.AddAsync(product);
        }

        public async Task<bool> UpdateProductAsync(UpdateProductDto dto)
        {
            var product = await _repo.GetByIdAsync(dto.Id);
            if (product == null) return false;

            product.Name = dto.Name;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;

            await _repo.UpdateAsync(product);
            return true;
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _repo.GetByIdAsync(id);
            if (product == null) return false;

            await _repo.DeleteAsync(product);
            return true;
        }

        public async Task AddProductsBulkAsync(List<CreateProductDto> products)
        {
            var entities = products.Select(p => new Product
            {
                Name = p.Name,
                Price = p.Price,
                CategoryId = p.CategoryId
            }).ToList();

            await _repo.AddRangeAsync(entities);
        }
    }
}
