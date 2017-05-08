using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Business.Interfaces
{
    public interface IAuthorManager
    {
        IEnumerable<string> GetAll();
    }
}
