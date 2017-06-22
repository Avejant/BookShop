using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using BookShop.Shared.ViewModels;
using BookShop.Shared.Helpers;

namespace BookShop.Web.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
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
            return new JsonResult(GetSampleBooks()
                .Where(b => b.Id == id)
                .FirstOrDefault(),
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
            var items = GetSampleBooks().OrderByDescending(i => i.CreatedDate).Take(n);
            return new JsonResult(items, DefaultJsonSettings);
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
            var items = GetSampleBooks().OrderBy(b => Guid.NewGuid()).Take(n);
            return new JsonResult(items, DefaultJsonSettings);
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
            var items = GetSampleBooks().OrderBy(b => b.ViewCount).Take(n);
            return new JsonResult(items, DefaultJsonSettings);
        }

        #region Private Methods and Properties
        private List<BookViewModel> GetSampleBooks(int num = 1000)
        {
            var books = new List<BookViewModel>();
            DateTime date = new DateTime(2015, 12, 31).AddDays(-num);
            var price = 2.05m;
            for (int i = 1; i < num; i++)
            {
                date = date.AddDays(1);
                price += 0.25m;
                books.Add(new BookViewModel()
                {
                    Id = i,
                    Title = string.Format("Book №{0}", i),
                    Author = string.Format("Author №{0}", i % 5),
                    Price = new Money(price).ToString(),
                    CreatedDate = date,
                    LastModifiedDate = date,
                    ViewCount = num - 1
                });
           }
           return books;
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
