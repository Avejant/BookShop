using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using BookShop.Business.Interfaces;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace BookShop.Web.Controllers
{
    [Route("api/[controller]")]
    public class AuthorsController : Controller
    {
        private IAuthorManager authorManager;

        public AuthorsController(IAuthorManager authorManager)
        {
            this.authorManager = authorManager;
        }

        // GET api/authors
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return this.authorManager.GetAll();
        }

    }
}
