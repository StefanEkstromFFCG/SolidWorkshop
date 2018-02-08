using System;

namespace FFCG.G5.SolidWebShop
{
    public class Product
    {
        public Guid Id { get; }
        public string Name { get; }
        public decimal Price { get; private set; }
        public ProductCategory Category { get; }

        public Product(string name, ProductCategory category, decimal price)
        {
            Id = Guid.NewGuid();
            Name = name;
            Category = category;
            Price = price;
        }
    }
}
