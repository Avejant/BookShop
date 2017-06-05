using BookShop.Data;
using System.Threading.Tasks;

namespace BookShop.Business.Interfaces
{
    public interface IUserManager
    {
        Task<ApplicationUser> GetUserByName(string username);
        Task<bool> CheckPassword(ApplicationUser user, string password);
    }
}
