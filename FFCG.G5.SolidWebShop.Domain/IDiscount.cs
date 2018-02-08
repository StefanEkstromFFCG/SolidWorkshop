using System.Collections.Generic;

namespace FFCG.G5.SolidWebShop
{
    public interface IDiscount
    {
        bool AppliesTo(IEnumerable<Product> products);
        decimal Calculate(IEnumerable<Product> products);
    }
}
