using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication_React.Data;
using WebApplication_React.Dto;
using WebApplication_React.Interfaces;
using WebApplication_React.Models;

namespace WebApplication_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly IJwtTokenService _jwtService;

        public AuthController(AppDbContext context, IConfiguration config, IJwtTokenService jwtService)
        {
            _context = context;
            _config = config;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password"
                });
            }

            var token = _jwtService.GenerateToken(user);
            return Ok(new
            {
                token = token,
                username = user.Name,   // or user.Name if you have
                role = user.Role
            });
        }
    }
}
