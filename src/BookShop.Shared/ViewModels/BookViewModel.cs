using Newtonsoft.Json;
using System;

namespace BookShop.Shared.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class BookViewModel
    {
        #region Constructor
        public BookViewModel()
        {

        }
        #endregion

        #region Properties
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public string Price { get; set; }
        public string Description { get; set; }
        public string ISBN { get; set; }
        public int YearOfPublication { get; set; }
        public int PageCount { get; set; }
        [JsonIgnore]
        public int ViewCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        #endregion

    }
}
