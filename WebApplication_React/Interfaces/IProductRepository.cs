using WebApplication_React.Models;

namespace WebApplication_React.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IEnumerable<Product>> GetAllWithCategoryAsync();
        Task UpdateAsync(Product product);
        Task AddRangeAsync(IEnumerable<Product> products);
    }
}
