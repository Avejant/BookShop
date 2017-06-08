using BookShop.Business.Interfaces;
using BookShop.Shared.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace BookShop.Web.Controllers
{
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private ICategoryManager categoryManager;

        public CategoriesController(ICategoryManager categoryManager)
        {
            this.categoryManager = categoryManager;
        }

        // GET api/categories
        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(categoryManager.GetAll(), DefaultJsonSettings);
        }

        private JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }

    }
}
