using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication_React.Data;

namespace WebApplication_React.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            var totalUsers = _context.Users.Count();
            var totalProducts = _context.Products.Count();
            var totalOrders = _context.Orders.Count();

            return Ok(new
            {
                totalUsers,
                totalProducts,
                totalOrders
            });
        }
    }
}
