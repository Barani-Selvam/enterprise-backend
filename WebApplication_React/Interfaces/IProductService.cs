using WebApplication_React.Dto;
using WebApplication_React.Models;

namespace WebApplication_React.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task AddProductAsync(CreateProductDto dto);
        Task<bool> UpdateProductAsync(UpdateProductDto dto);
        Task<bool> DeleteProductAsync(int id);
        Task AddProductsBulkAsync(List<CreateProductDto> products);
    }
}
