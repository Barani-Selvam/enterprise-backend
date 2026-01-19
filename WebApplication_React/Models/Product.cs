using WebApplication_React.Abstract;

namespace WebApplication_React.Models
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public decimal Price { get; set; }

        // Foreign Key
        public int CategoryId { get; set; }

        // Navigation
        public Category Category { get; set; }
    }
}
