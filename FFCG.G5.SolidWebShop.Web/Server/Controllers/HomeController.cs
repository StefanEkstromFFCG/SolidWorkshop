using System;
using System.Threading.Tasks;
using FFCG.G5.SolidWebShop.Web.Server.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace FFCG.G5.SolidWebShop.Web.Server.Controllers
{
  public class HomeController : Controller
  {
    [HttpGet]
    public async Task<IActionResult> Index()
    {
      var prerenderResult = await Request.BuildPrerender();

      ViewData["SpaHtml"] = prerenderResult.Html; // our <app> from Angular
      ViewData["Title"] = prerenderResult.Globals["title"];
      ViewData["Styles"] = prerenderResult.Globals["styles"];
      ViewData["Scripts"] = prerenderResult.Globals["scripts"];
      ViewData["Meta"] = prerenderResult.Globals["meta"];
      ViewData["Links"] = prerenderResult.Globals["links"];
      ViewData["TransferData"] = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};

      return View();
    }

    [HttpGet]
    [Route("sitemap.xml")]
    public async Task<IActionResult> SitemapXml()
    {
      var xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

      xml += "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
      xml += "<sitemap>";
      xml += "<loc>http://localhost:4251/home</loc>";
      xml += "<lastmod>" + DateTime.Now.ToString("yyyy-MM-dd") + "</lastmod>";
      xml += "</sitemap>";
      xml += "<sitemap>";
      xml += "<loc>http://localhost:4251/counter</loc>";
      xml += "<lastmod>" + DateTime.Now.ToString("yyyy-MM-dd") + "</lastmod>";
      xml += "</sitemap>";
      xml += "</sitemapindex>";

      return Content(xml, "text/xml");
    }

    public IActionResult Error()
    {
      return View();
    }
  }
}
