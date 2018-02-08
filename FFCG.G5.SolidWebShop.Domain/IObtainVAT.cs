namespace FFCG.G5.SolidWebShop
{
    public interface IObtainVAT
    {
        decimal Get(ProductCategory category, string country);
    }
}
