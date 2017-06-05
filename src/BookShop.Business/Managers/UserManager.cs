using BookShop.Business.Interfaces;
using BookShop.Data;
using System;
using System.Threading.Tasks;
using IdentityUserManager = Microsoft.AspNetCore.Identity.UserManager<BookShop.Data.ApplicationUser>;
namespace BookShop.Business.Managers
{
    public class UserManager : IUserManager
    {
        private ApplicationDbContext dbContext;
        private IdentityUserManager identityUserManager;

        public UserManager(ApplicationDbContext dbContext, IdentityUserManager identityUserManager)
        {
            this.dbContext = dbContext;
            this.identityUserManager = identityUserManager;
        }

        public async Task<ApplicationUser> GetUserByName(string username)
        {
            var user = await this.identityUserManager.FindByNameAsync(username);
            if (user == null && username.Contains("@"))
            {
                user = await this.identityUserManager.FindByEmailAsync(username);
            }

            return user;
        }

        public async Task<bool> CheckPassword(ApplicationUser user, string password)
        {
            var result = await identityUserManager.CheckPasswordAsync(user, password);
            return result;
        }

    }
}
