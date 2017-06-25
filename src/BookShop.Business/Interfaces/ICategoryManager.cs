using BookShop.Shared.ViewModels;
using System.Collections.Generic;

namespace BookShop.Business.Interfaces
{
    public interface ICategoryManager
    {
        CategoryViewModel GetById(int id);
        IEnumerable<CategoryViewModel> GetAll();
    }
}
