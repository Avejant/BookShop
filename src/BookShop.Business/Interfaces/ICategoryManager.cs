using BookShop.Shared.ViewModels;
using System.Collections.Generic;

namespace BookShop.Business.Interfaces
{
    public interface ICategoryManager
    {
        IEnumerable<CategoryViewModel> GetAll();
    }
}
