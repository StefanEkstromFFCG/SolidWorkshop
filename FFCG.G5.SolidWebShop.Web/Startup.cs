using System;
using System.IO;
using FFCG.G5.SolidWebShop.Web.Server.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;

namespace FFCG.G5.SolidWebShop.Web
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", true, true)
        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
        .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    public static void Main(string[] args)
    {
      var host = new WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(Directory.GetCurrentDirectory())
        .UseIISIntegration()
        .UseStartup<Startup>()
        .Build();

      host.Run();
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc();
      services.AddNodeServices();

      var connectionStringBuilder = new SqliteConnectionStringBuilder {DataSource = "webshop.db"};
      var connectionString = connectionStringBuilder.ToString();

      services.AddDbContext<WebshopDbContext>(options =>
        options.UseSqlite(connectionString));

      services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new Info {Title = "Webshop API", Version = "v1"}); });
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
      WebshopDbContext context)
    {
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      loggerFactory.AddDebug();

      app.UseStaticFiles();

      DbInitializer.Initialize(context);

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
        {
          HotModuleReplacement = true,
          HotModuleReplacementEndpoint = "/dist/__webpack_hmr"
        });
        app.UseSwagger();
        app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"); });

        app.MapWhen(x => !x.Request.Path.Value.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase), builder =>
        {
          builder.UseMvc(routes =>
          {
            routes.MapSpaFallbackRoute(
              "spa-fallback",
              new {controller = "Home", action = "Index"});
          });
        });
      }
      else
      {
        app.UseMvc(routes =>
        {
          routes.MapRoute(
            "default",
            "{controller=Home}/{action=Index}/{id?}");

          routes.MapRoute(
            "Sitemap",
            "sitemap.xml",
            new {controller = "Home", action = "SitemapXml"});

          routes.MapSpaFallbackRoute(
            "spa-fallback",
            new {controller = "Home", action = "Index"});
        });
        app.UseExceptionHandler("/Home/Error");
      }
    }
  }
}
