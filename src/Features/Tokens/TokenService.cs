using app.Models;
using app.Models.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Serilog;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;

namespace app.Features.Tokens {
    public class TokenService {
        private readonly Uri TokenUri;
        private readonly string _tokenUrl = "/tokens/generateToken";
        private const int TenMinuteBufferInMilliSeconds = 600000;
        private readonly HttpClient _client;
        private readonly KeyValuePair<string, string>[] FormData;
        private readonly ILogger _log;
        private DateTime _expiresIn = DateTime.UtcNow;
        private string _currentToken;

        public TokenService(IArcGISCredential credentials, ILogger log) {
            _log = log;

            var httpClientHandler = new HttpClientHandler();
            if (httpClientHandler.SupportsAutomaticDecompression) {
                httpClientHandler.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            }

            _client = new HttpClient(httpClientHandler);

            TokenUri = new Uri(UriHelper.BuildAbsolute(credentials.Scheme,
                new HostString(credentials.Host),
                credentials.PathBase,
                _tokenUrl));

            FormData = new KeyValuePair<string, string>[]{
                new KeyValuePair<string, string>("username", credentials.Username),
                new KeyValuePair<string, string>("password", credentials.Password),
                new KeyValuePair<string, string>("client", "requestip"),
                new KeyValuePair<string, string>("expiration", "14400"),
                new KeyValuePair<string, string>("f", "json")
            };

            Formatters = new List<MediaTypeFormatter>
            {
                new PlainTextFormatter()
            };
        }

        private IEnumerable<MediaTypeFormatter> Formatters { get; }

        public async Task<string> GetToken() {
            _log.Verbose("GetToken");

            if (!string.IsNullOrEmpty(_currentToken)) {
                var utcNow = DateTime.UtcNow;

                _log.Verbose("The time is {Now} and the token expires at {Expires}", utcNow, _expiresIn);

                if (utcNow < _expiresIn) {
                    _log.Debug("The current token is still valid.");

                    return _currentToken;
                }

                _log.Verbose("Requesting a new token");
            }

            _log.Debug("Requesting the first token");

            using (var formContent = new FormUrlEncodedContent(FormData)) {
                try {
                    var response = await _client.PostAsync(TokenUri, formContent);
                    TokenResponse tokenResponse = null;

                    try {
                        tokenResponse = await response.Content.ReadAsAsync<TokenResponse>(Formatters);
                    } catch (UnsupportedMediaTypeException) {
                        _log.Error("problem creating token response: {data}", response.Content.ReadAsStringAsync().Result);

                        return null;
                    }

                    _log.Debug("Token service response {@Response}", tokenResponse);

                    var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
                    _expiresIn = epoch.AddMilliseconds(tokenResponse.Expires - TenMinuteBufferInMilliSeconds);

                    return _currentToken = tokenResponse.Token;
                } catch (Exception ex) {
                    _log.Error(ex, "Getting a token from {Url}", TokenUri.AbsoluteUri);

                    return null;
                }
            }
        }
    }
}
