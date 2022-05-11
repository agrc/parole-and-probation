using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace parole {
    public class Program {
        public static void Main(string[] args) =>
            CreateHostBuilder(args).Build().Run();

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog((context, config) => config.ReadFrom.Configuration(context.Configuration))
                .ConfigureAppConfiguration((hostingContext, config) => {
                    if (hostingContext.HostingEnvironment.IsProduction()) {
                        config.AddJsonFile(
                            Path.Combine(Path.DirectorySeparatorChar.ToString(), "secrets", "dotnet", "appsettings.Production.json"),
                            optional: false,
                            reloadOnChange: true
                        );
                    }
                })
                .ConfigureWebHostDefaults(webBuilder => webBuilder
                    .UseStartup<Startup>()
                    .UseWebRoot("ClientApp/dist")
                );
    }
}
