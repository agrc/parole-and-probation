using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace parole.Infrastructure {
    public class ExceptionHandlingMiddleware {
        private readonly RequestDelegate next;
        private readonly ILogger _log;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger log) {
            this.next = next;
            _log = log;
        }

        public async Task Invoke(HttpContext context) {
            try {
                await next(context);
            } catch (Exception ex) {
                _log.Error(ex, "Unhandled exception");
            }
        }
    }

    public static class ExceptionHandlingMiddlewareExtensions {
        public static IApplicationBuilder UseApiExceptionHandler(this IApplicationBuilder builder) {
            return builder.UseMiddleware<ExceptionHandlingMiddleware>();
        }
    }
}
