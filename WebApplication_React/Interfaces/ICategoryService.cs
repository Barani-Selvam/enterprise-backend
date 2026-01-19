using WebApplication_React.Models;

namespace WebApplication_React.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category> CreateAsync(Category category);
        Task<bool> DeleteAsync(int id);
    }
}
