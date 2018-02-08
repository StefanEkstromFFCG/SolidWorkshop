using FFCG.G5.SolidWebShop.Web.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FFCG.G5.SolidWebShop.Web.Server.Data
{
    public class WebshopDbContext : DbContext
    {
        public WebshopDbContext(DbContextOptions<WebshopDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> User { get; set; }
    }
}
