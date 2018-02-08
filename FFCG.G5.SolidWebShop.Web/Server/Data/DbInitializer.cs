using System.Linq;
using FFCG.G5.SolidWebShop.Web.Server.Models;

namespace FFCG.G5.SolidWebShop.Web.Server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(WebshopDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.User.Any())
            {
                return;
            }
            var users = new User[]
            {
               new User(){Name = "Greger Foobarson"},
               new User(){Name = "Foobar Gregersson"},
               new User(){Name = "Some guy"},
               new User(){Name = "Some Gal"}
            };

            foreach (var user in users)
            {
                context.User.Add(user);
            }
            context.SaveChanges();
        }
    }
}
