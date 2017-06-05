namespace BookShop.Business.Managers
{
    using Data;
    using Interfaces;
    using System.Collections.Generic;
    using System.Linq;

    public class AuthorManager : IAuthorManager
    {
        private ApplicationDbContext dbContext;

        public AuthorManager(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IEnumerable<string> GetAll()
        {
            return dbContext.Authors.Select(a => a.Name);
        }
    }
}
