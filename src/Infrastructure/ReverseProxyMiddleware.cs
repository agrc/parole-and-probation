using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using app.Features.Tokens;
using Serilog;
using app.Models.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Primitives;

namespace app.Infrastructure {
    public class ReverseProxyMiddleware {
        private static readonly HttpClient _httpClient = new HttpClient();
        private readonly RequestDelegate _nextMiddleware;
        private readonly TokenService _tokenService;
        private readonly IArcGISCredential _credentials;
        private readonly ILogger _log;
        private readonly TokenValidationParameters _token;

        public ReverseProxyMiddleware(RequestDelegate nextMiddleware, TokenService tokenService, IArcGISCredential credentials, ILogger log, TokenValidationParameters token) {
            _nextMiddleware = nextMiddleware;
            _tokenService = tokenService;
            _credentials = credentials;
            _log = log;
            _token = token;
        }

        public async Task Invoke(HttpContext context) {
            var validated = ValidateAndDecode(context.Request, _token);

            if (!validated) {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid Access Token");

                return;
            }

            var targetUri = await BuildTargetUri(context.Request);

            if (targetUri != null) {
                var targetRequestMessage = CreateTargetMessage(context, targetUri);

                using (var responseMessage = await _httpClient.SendAsync(targetRequestMessage, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted)) {
                    context.Response.StatusCode = (int)responseMessage.StatusCode;
                    CopyFromTargetResponseHeaders(context, responseMessage);
                    await responseMessage.Content.CopyToAsync(context.Response.Body);
                }
                return;
            }

            await _nextMiddleware(context);
        }

        private HttpRequestMessage CreateTargetMessage(HttpContext context, Uri targetUri) {
            var requestMessage = new HttpRequestMessage();
            CopyFromOriginalRequestContentAndHeaders(context, requestMessage);

            requestMessage.RequestUri = targetUri;
            requestMessage.Headers.Host = targetUri.Host;
            requestMessage.Method = GetMethod(context.Request.Method);

            return requestMessage;
        }

        private void CopyFromOriginalRequestContentAndHeaders(HttpContext context, HttpRequestMessage requestMessage) {
            var requestMethod = context.Request.Method;

            if (!HttpMethods.IsGet(requestMethod) &&
              !HttpMethods.IsHead(requestMethod) &&
              !HttpMethods.IsDelete(requestMethod) &&
              !HttpMethods.IsTrace(requestMethod)) {
                var streamContent = new StreamContent(context.Request.Body);
                requestMessage.Content = streamContent;
            }

            foreach (var header in context.Request.Headers) {
                requestMessage.Content?.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
            }
        }

        private void CopyFromTargetResponseHeaders(HttpContext context, HttpResponseMessage responseMessage) {
            foreach (var header in responseMessage.Headers) {
                context.Response.Headers[header.Key] = header.Value.ToArray();
            }

            foreach (var header in responseMessage.Content.Headers) {
                context.Response.Headers[header.Key] = header.Value.ToArray();
            }
            context.Response.Headers.Remove("transfer-encoding");
        }

        private static HttpMethod GetMethod(string method) {
            if (HttpMethods.IsDelete(method)) return HttpMethod.Delete;
            if (HttpMethods.IsGet(method)) return HttpMethod.Get;
            if (HttpMethods.IsHead(method)) return HttpMethod.Head;
            if (HttpMethods.IsOptions(method)) return HttpMethod.Options;
            if (HttpMethods.IsPost(method)) return HttpMethod.Post;
            if (HttpMethods.IsPut(method)) return HttpMethod.Put;
            if (HttpMethods.IsTrace(method)) return HttpMethod.Trace;
            return new HttpMethod(method);
        }

        private async Task<Uri> BuildTargetUri(HttpRequest request) {
            Uri targetUri = null;

            if (request.Path.StartsWithSegments("/mapserver", out var remainingPath)) {
                targetUri = new Uri(UriHelper.BuildAbsolute(_credentials.Scheme,
                    new HostString(_credentials.Host),
                    _credentials.PathBase,
                    _credentials.PathString + remainingPath,
                    request.QueryString.Add("token", await _tokenService.GetToken())));

                _log.Verbose("proxying connection to {url}", targetUri.AbsolutePath);
            }

            return targetUri;
        }

        private bool ValidateAndDecode(HttpRequest request, TokenValidationParameters validationToken) {
            if (!request.Path.StartsWithSegments("/mapserver", out var remainingPath)) {
                return true;
            }

            var jwt = request.Headers["Authorization"];

            if (StringValues.IsNullOrEmpty(jwt)) {
                return false;
            }

            // remove `Bearer `
            jwt = jwt.ToString().Remove(0, 7);

            try {
                var claimsPrincipal = new JwtSecurityTokenHandler().ValidateToken(jwt, validationToken, out var rawValidatedToken);

                return true;
            } catch (SecurityTokenValidationException ex) {
                _log.Warning(ex, "Token validation failure");

                return false;
            } catch (ArgumentException ex) {
                _log.Warning(ex, "Token not well formed");

                return false;
            }
        }
    }
}
