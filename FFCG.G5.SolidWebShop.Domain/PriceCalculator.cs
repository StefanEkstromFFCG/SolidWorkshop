using System.Collections.Generic;
using System.Linq;

namespace FFCG.G5.SolidWebShop
{
    public class PriceCalculator
    {
        private readonly IObtainDiscounts _discountLibrary;
        private readonly IObtainVAT _vatStore;

        public PriceCalculator(IObtainDiscounts discountLibrary, IObtainVAT vatStore)
        {
            _discountLibrary = discountLibrary;
            _vatStore = vatStore;
        }

        public decimal CalculateTotal(IEnumerable<Product> products, string country = "Sweden")
        {
            var total = products.Sum(x => x.Price + (x.Price * _vatStore.Get(x.Category, country)));

            return _discountLibrary
                        .GetDiscounts()
                        .Where(discount => discount.AppliesTo(products))
                        .Aggregate(total, (current, discount) => current - discount.Calculate(products));
        }
    }
}
