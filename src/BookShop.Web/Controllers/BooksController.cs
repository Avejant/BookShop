using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using BookShop.Shared.ViewModels;
using BookShop.Shared.Helpers;
using BookShop.Business.Interfaces;
using BookShop.Shared.Enums;

namespace BookShop.Web.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private IBookManager bookManager;
        public BooksController(IBookManager bookManager)
        {
            this.bookManager = bookManager;
        }
        
        #region RESTful Conventions
        /// <summary>
        /// GET: api/books
        /// </summary>
        /// <returns>Nothing: this method will raise a HttpNotFound HTTP exception, since we're not supporting this API call.</returns>
        [HttpGet()]
        public IActionResult Get()
        {
            return NotFound(new { Error = "not found" });
        }

        /// <summary>
        /// GET: api/bboks/{id}
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>A Json-serialized object representing a single book.</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return new JsonResult(this.bookManager.GetById(id),
                DefaultJsonSettings);
        }
        #endregion

        [HttpGet("GetLatest")]
        public IActionResult GetLatest()
        {
            return GetLatest(DefaultNumberOfBooks);
        }

        [HttpGet("GetLatest/{n}")]
        public IActionResult GetLatest(int n)
        {
            if (n > MaxNumberOfBooks) n = MaxNumberOfBooks;
            var books = this.bookManager.GetAll(n, SortingType.ByCreatedDate, false);
            return new JsonResult(books, DefaultJsonSettings);
        }

        [HttpGet("GetRandom")]
        public IActionResult GetRandom()
        {
            return GetRandom(DefaultNumberOfBooks);
        }

        [HttpGet("GetRandom/{n}")]
        public IActionResult GetRandom(int n)
        {
            if (n > MaxNumberOfBooks) n = MaxNumberOfBooks;
            var books = this.bookManager.GetAll(n, SortingType.ByRandom);
            return new JsonResult(books, DefaultJsonSettings);
        }

        [HttpGet("GetMostViewed")]
        public IActionResult GetMostViewed()
        {
            return GetMostViewed(DefaultNumberOfBooks);
        }

        [HttpGet("GetMostViewed/{n}")]
        public IActionResult GetMostViewed(int n)
        {
            if (n > MaxNumberOfBooks) n = MaxNumberOfBooks;
            var books = this.bookManager.GetAll(n, SortingType.ByViewCount);
            return new JsonResult(books, DefaultJsonSettings);
        }

        #region Private Methods and Properties
 
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

        private int DefaultNumberOfBooks
        {
            get
            {
                return 4;
            }
        }

        private int MaxNumberOfBooks
        {
            get
            {
                return 100;
            }
        }
        #endregion

    }
}
