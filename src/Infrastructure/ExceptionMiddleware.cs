using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Serilog;

namespace parole.Infrastructure;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger log)
{
    private readonly RequestDelegate next = next;
    private readonly ILogger _log = log;

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            _log.Error(ex, "Unhandled exception");

            if (context.Response.HasStarted)
            {
                throw;
            }

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new
            {
                message = "Internal server error"
            });
        }
    }
}

public static class ExceptionHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseApiExceptionHandler(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}
