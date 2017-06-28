using System.Collections.Generic;

namespace BookShop.Shared.ViewModels
{
    public class PagedListViewModel<T>
    {
        public IEnumerable<T> items;
        public int totalPageCount;
        public int currentPage;
        public int totalItemsCount;
        public int pageSize;

        public PagedListViewModel(IEnumerable<T> items, int currentPage, int totalItemsCount, int pageSize)
        {
            this.items = items;
            this.totalItemsCount = totalItemsCount;
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            this.totalPageCount = this.totalItemsCount/this.pageSize;

        }
    }
}
