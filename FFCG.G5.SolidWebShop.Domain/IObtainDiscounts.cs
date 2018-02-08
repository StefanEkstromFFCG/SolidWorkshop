using System.Collections.Generic;

namespace FFCG.G5.SolidWebShop
{
    public interface IObtainDiscounts
    {
        IEnumerable<IDiscount> GetDiscounts();
    }
}
