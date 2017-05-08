namespace BookShop.Business.Managers
{
    using Interfaces;
    using System.Collections.Generic;

    public class AuthorManager : IAuthorManager
    {
        public IEnumerable<string> GetAll()
        {
            return new string[] { "One", "Two" };
        }
    }
}
