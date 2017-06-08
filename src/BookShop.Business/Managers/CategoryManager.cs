﻿using BookShop.Business.Interfaces;
using BookShop.Data;
using BookShop.Shared.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Business.Managers
{
    public class CategoryManager : ICategoryManager
    {
        private ApplicationDbContext dbContext;

        public CategoryManager(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IEnumerable<CategoryViewModel> GetAll()
        {
            return this.dbContext.Categories.Select(c => new CategoryViewModel {Id = c.Id.ToString(), Name = c.Name });
        }
    }
}