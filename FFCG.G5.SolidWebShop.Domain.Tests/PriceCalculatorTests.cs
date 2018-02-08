using System.Collections.Generic;
using System.Linq;
using FakeItEasy;
using FluentAssertions;
using NUnit.Framework;

namespace FFCG.G5.SolidWebShop.Domain.Tests
{
    [TestFixture]
    public class PriceCalculatorTests
    {
        private PriceCalculator _calculator;
        private IObtainDiscounts _discountLibrary;
        private IObtainVAT _vatLibrary;

        private List<Product> _products;

        [SetUp]
        public void SetUp()
        {
            _discountLibrary = A.Fake<IObtainDiscounts>();
            _vatLibrary = A.Fake<IObtainVAT>();
            _calculator = new PriceCalculator(_discountLibrary, _vatLibrary);
            A.CallTo(() => _vatLibrary.Get(A<ProductCategory>.Ignored, A<string>.Ignored)).Returns(0);

            _products = new List<Product>()
            {
                new Product("Apple", ProductCategory.Food, 10),
                new Product("Apple", ProductCategory.Food, 10),
                new Product("Hax phone", ProductCategory.Tech, 20000)
            };
        }

        [Test]
        public void Should_Calculate_Total()
        {
            _calculator.CalculateTotal(_products).Should().Be(20020);
        }

        [Test]
        public void Should_Apply_Discounts()
        {
            A.CallTo(() => _discountLibrary.GetDiscounts()).Returns(new List<IDiscount>()
            {
                new TestThreeOrMoreItemsDiscount(),
                new TestAtLeastTwoFoodProductsDiscount()
            });

            _calculator.CalculateTotal(_products).Should().Be(20020m - (20020 * 0.1m) - (20 * 0.2m));
        }

        [Test]
        public void Should_Apply_Vat()
        {
            A.CallTo(() => _vatLibrary.Get(ProductCategory.Food, A<string>.Ignored)).Returns(0.05m);
            A.CallTo(() => _vatLibrary.Get(ProductCategory.Tech, A<string>.Ignored)).Returns(0.125m);
            _calculator.CalculateTotal(_products).Should().Be((20m + (20m * 0.05m) + 20000m + (20000m * 0.125m)));
        }

        public class TestThreeOrMoreItemsDiscount : IDiscount
        {
            public bool AppliesTo(IEnumerable<Product> products) => products.Count() >= 3;

            public decimal Calculate(IEnumerable<Product> products)
            {
                return products.Sum(x => x.Price) * 0.1m;
            }
        }

        public class TestAtLeastTwoFoodProductsDiscount : IDiscount
        {
            public bool AppliesTo(IEnumerable<Product> products) => products.Count(x => x.Category == ProductCategory.Food) >= 2;

            public decimal Calculate(IEnumerable<Product> products)
            {
                return products.Where(x => x.Category == ProductCategory.Food).Sum(x => x.Price) * 0.2m;
            }
        }
    }
}
