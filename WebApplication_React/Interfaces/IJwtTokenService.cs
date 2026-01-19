using WebApplication_React.Models;

namespace WebApplication_React.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(User user);
    }
}
