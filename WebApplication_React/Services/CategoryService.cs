using WebApplication_React.Interfaces;
using WebApplication_React.Models;

namespace WebApplication_React.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _repository;

        public CategoryService(IRepository<Category> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await _repository.AddAsync(category);
            return category;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _repository.GetByIdAsync(id);
            if (category == null)
                return false;

            await _repository.DeleteAsync(category);
            return true;
        }
    }
}
