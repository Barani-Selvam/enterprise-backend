using System.Text.Json.Serialization;
using WebApplication_React.Abstract;

namespace WebApplication_React.Models
{
    public class Category: BaseEntity
    {
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<Product> Products { get; set; }
    }
}
