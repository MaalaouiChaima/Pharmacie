using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using Pharmacie1.API;

namespace pharmacie1.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/octet-stream"));
            //config.EnableCors(new EnableCorsAttribute("http://localhost:4200", headers: "*", methods: "*"));

            //var cors = new EnableCorsAttribute("*", "*", "*");
          //  config.EnableCors(cors);

            // Configuration et services API Web
            config.DependencyResolver = new NinjectResolver();

            // Itinéraires de l'API Web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
