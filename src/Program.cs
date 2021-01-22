using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.GoogleCloudLogging;

namespace parole {
    public class Program {
        public static void Main(string[] args) {
            new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json")
              .Build();

            var config = new GoogleCloudLoggingSinkOptions {
                ProjectId = "ut-dts-agrc-parole-dev",
                LogName = "parole-api",
                UseSourceContextAsLogName = false,
                ResourceType = "global",
                ServiceName = "parole-api",
                ServiceVersion = "1.0.0",
                UseJsonOutput = true
            };
            config.ResourceLabels.Add("project_id", "ut-dts-agrc-parole-dev");
            config.Labels.Add("configuration", "staging");

            Log.Logger = new LoggerConfiguration()
                  .MinimumLevel.Debug()
                  .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                  .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
                  .Enrich.FromLogContext()
                  .WriteTo.Console()
                  .WriteTo.GoogleCloudLogging(config)
                  .CreateLogger();

            Log.Logger.Information("Starting web host...");

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder => webBuilder.UseStartup<Startup>());
    }
}
