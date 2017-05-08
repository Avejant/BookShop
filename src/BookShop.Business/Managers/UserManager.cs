using BookShop.Business.Interfaces;
using BookShop.Data;
using System;

namespace BookShop.Business.Managers
{
    public class UserManager : IUserManager
    {
        private ApplicationDbContext dbContext;
        public UserManager(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public bool CheckPassword(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}
