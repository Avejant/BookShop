using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShop.Shared.Helpers
{
    public class Money
    {
        private decimal price;

        public Money(decimal price)
        {
            this.price = price;
        }

        public override string ToString()
        {
            return price.ToString() + "$";
        }
    }
}
