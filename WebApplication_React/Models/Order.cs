using WebApplication_React.Abstract;

namespace WebApplication_React.Models
{
    public class Order : BaseEntity
    {
        public int UserId { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
