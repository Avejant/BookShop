using Newtonsoft.Json;
using System;

namespace BookShop.Shared.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class CategoryViewModel
    {
        public CategoryViewModel()
        {

        }

        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
    }
}
