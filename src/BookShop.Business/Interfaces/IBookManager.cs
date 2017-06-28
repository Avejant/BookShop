using BookShop.Data;
using BookShop.Shared.Enums;
using BookShop.Shared.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Business.Interfaces
{
    public interface IBookManager
    {
        IEnumerable<BookViewModel> GetAll();
        IEnumerable<BookViewModel> GetAll(int count, SortingType sortingType = SortingType.None, bool ascSorting = true);
        BookViewModel GetById(int id);
        PagedListViewModel<BookViewModel> GetPage(int pageSize, int currentPageIndex);
    }
}
