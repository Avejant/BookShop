using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Data
{
    public class DbSeeder
    {
        private ApplicationDbContext dbContext;
        private RoleManager<IdentityRole> RoleManager;
        private UserManager<ApplicationUser> UserManager;

        public DbSeeder(ApplicationDbContext dbContext, RoleManager<IdentityRole> RoleManager, UserManager<ApplicationUser> UserManager)
        {
            this.dbContext = dbContext;
            this.RoleManager = RoleManager;
            this.UserManager = UserManager;
        }

        public async Task SeedAsync()
        {
            dbContext.Database.EnsureCreated();

            if (await dbContext.Users.CountAsync() == 0)
            {
                await this.CreateUsersAsync();
            }

            if (await dbContext.Categories.CountAsync() == 0)
            {
                this.CreateCategories();
            }

            if(await dbContext.Authors.CountAsync() == 0)
            {
                this.CreateAuthors();
            }

            if (await dbContext.Books.CountAsync() == 0)
            {
                this.CreateBooks();
            }
        }

        private void CreateAuthors()
        {
            var authors = new List<Author>();
            for (int i = 0; i < 10; i++)
            {
                authors.Add(new Author()
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = string.Format("Author №{0}", i)
                });
            }
            this.dbContext.Authors.AddRange(authors);
            this.dbContext.SaveChanges();
        }

        private void CreateBooks()
        {
            var num = 100;
            var books = new List<Book>();
            var authors = this.dbContext.Authors.ToList();
            var categories = this.dbContext.Categories.ToList();
            DateTime date = new DateTime(2015, 12, 31).AddDays(-num);
            var price = 2.05m;
            for (int i = 1; i <= num; i++)
            {
                date = date.AddDays(1);
                price += 0.25m;
                books.Add(new Book()
                {
                    Title = string.Format("Book №{0}", i),
                    AuthorId = authors[i % authors.Count()].Id,
                    CategoryId = categories[i % categories.Count()].Id,
                    Description = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    Price = price.ToString(),
                    CreatedDate = date,
                    LastModifiedDate = date,
                    ViewCount = num - 1
                });
            }
            this.dbContext.Books.AddRange(books);
            this.dbContext.SaveChanges();
        }

        private void CreateCategories()
        {
            var categories = new List<Category>();
            for (int i = 0; i < 10; i++)
            {
                categories.Add(new Category
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = string.Format("Category {0}", i + 1)
                });
            }

            this.dbContext.AddRange(categories);
            this.dbContext.SaveChanges();
        }

        private async Task CreateUsersAsync()
        {
            var createdDate = DateTime.Now;
            var roleAdministrator = "Administrator";
            var roleBuyer = "Buyer";
            if (!await RoleManager.RoleExistsAsync(roleAdministrator)) await RoleManager.CreateAsync(new IdentityRole(roleAdministrator));
            if (!await RoleManager.RoleExistsAsync(roleBuyer)) await RoleManager.CreateAsync(new IdentityRole(roleBuyer));

            var admin = new ApplicationUser {
                UserName = "Admin", Email = "admin@mail.com",
                CreatedDate = createdDate,
                LastModifiedDate = createdDate
            };

            if(await UserManager.FindByIdAsync(admin.Id) == null)
            {
                await UserManager.CreateAsync(admin, "Pass4admin");
                await UserManager.AddToRoleAsync(admin, roleAdministrator);

                admin.EmailConfirmed = true;
                admin.LockoutEnabled = false;
            }

            var john = new ApplicationUser {
                UserName = "John",
                Email = "john.doe@mail.com",
                CreatedDate = createdDate,
                LastModifiedDate = createdDate,
                EmailConfirmed = true,
                LockoutEnabled = false
            };
            var martha = new ApplicationUser {
                UserName = "Martha",
                Email = "martha@mail.com",
                CreatedDate = createdDate,
                LastModifiedDate = createdDate,
                EmailConfirmed = true,
                LockoutEnabled = false
            };

            if(await UserManager.FindByIdAsync(john.Id) == null)
            {
                await UserManager.CreateAsync(john, "Pass4john");
                await UserManager.AddToRoleAsync(john, roleBuyer);
                john.EmailConfirmed = true;
                john.LockoutEnabled = false;
            }

            if (await UserManager.FindByIdAsync(martha.Id) == null)
            {
                await UserManager.CreateAsync(martha, "Pass4martha");
                await UserManager.AddToRoleAsync(martha, roleBuyer);
                martha.EmailConfirmed = true;
                martha.LockoutEnabled = false;
            }

            await this.dbContext.SaveChangesAsync();
        }
    }
}
