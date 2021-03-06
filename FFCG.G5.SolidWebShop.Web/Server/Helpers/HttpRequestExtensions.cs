using System.Threading.Tasks;
using FFCG.G5.SolidWebShop.Web.Server.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;

namespace FFCG.G5.SolidWebShop.Web.Server.Helpers
{
    public static class HttpRequestExtensions
    {
    public static IRequest AbstractRequestInfo(this HttpRequest request)
    {
      var requestSimplified = new IRequest
      {
        cookies = request.Cookies,
        headers = request.Headers,
        host = request.Host
      };

      return requestSimplified;
    }

    public static async Task<RenderToStringResult> BuildPrerender(this HttpRequest Request)
    {
      var nodeServices = Request.HttpContext.RequestServices.GetRequiredService<INodeServices>();
      var hostEnv = Request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>();

      var applicationBasePath = hostEnv.ContentRootPath;
      var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
      var unencodedPathAndQuery = requestFeature.RawTarget;
      var unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";

      var transferData = new TransferData
      {
        request = Request.AbstractRequestInfo(),
        thisCameFromDotNET = "Some data sent from the server"
      };

      var cancelSource = new System.Threading.CancellationTokenSource();
      var cancelToken = cancelSource.Token;

      return await Prerenderer.RenderToString(
                "/",
                nodeServices,
                cancelToken,
                new JavaScriptModuleExport(applicationBasePath + "/ClientApp/dist/main-server"),
                unencodedAbsoluteUrl,
                unencodedPathAndQuery,
                transferData,
                30000,
                Request.PathBase.ToString()
            );
    }
  }
}
