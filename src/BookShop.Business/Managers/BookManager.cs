using BookShop.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookShop.Shared.ViewModels;
using BookShop.Data;
using BookShop.Shared.Enums;

namespace BookShop.Business.Managers
{
    public class BookManager : IBookManager
    {
        private ApplicationDbContext dbContext;

        public BookManager(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IEnumerable<BookViewModel> GetAll()
        {
            var authors = this.dbContext.Authors.Select(a => a);
            return this.dbContext.Books.Select(b => this.EntityToViewModel(b, authors));
        }

        public IEnumerable<BookViewModel> GetAll(int count, SortingType sortingType = SortingType.None, bool ascSorting = true)
        {
            var authors = this.dbContext.Authors.Select(a => a);
            var result = this.dbContext.Books.Select(b=>b);
            switch (sortingType)
            {
                case SortingType.ByCreatedDate:
                    result = ascSorting ? result.OrderBy(b => b.CreatedDate) : result.OrderByDescending(b => b.CreatedDate);
                    break;
                case SortingType.ByRandom:
                    result = ascSorting ? result.OrderBy(b => Guid.NewGuid()) : result.OrderByDescending(b => Guid.NewGuid());
                    break;
                case SortingType.ByViewCount:
                    result = ascSorting ? result.OrderBy(b => b.ViewCount) : result.OrderByDescending(b => b.ViewCount);
                    break;
            }

            result = result.Take(count);
            return result.Select(b => this.EntityToViewModel(b, authors));
        }

        public BookViewModel GetById(int id)
        {
            var authors = this.dbContext.Authors.Select(a => a);
            return this.EntityToViewModel(this.dbContext.Books.Single(b => b.Id == id), authors);
        }

        private BookViewModel EntityToViewModel(Book model, IEnumerable<Author> authors)
        {
            return new BookViewModel
            {
                Id = model.Id,
                Author = authors.Single(a=>a.Id == model.AuthorId).Name,
                ViewCount = model.ViewCount,
                CreatedDate = model.CreatedDate,
                Description = model.Description,
                Price = model.Price,
                Title = model.Title,
                LastModifiedDate = model.LastModifiedDate
            };
        }
    }
}
